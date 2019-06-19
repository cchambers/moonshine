import Vue from 'vue'
import * as ace from 'brace';
import 'brace/mode/html';
import 'brace/theme/monokai';
import Pretty from 'pretty';

export default {
  name: 'LibToolbar',
  props: {
    baseCode: String,
  },
  data() {
    return {
      code: '',
      editorCode: '',
      html: 'Loading...',
      codeTarget: this.$refs.component,
      updateTimer: 0,
      uuid: '',
      editor: {}
    }
  },
  
  mounted() {
    let self = this;
    this.uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
    this.uuid = 'sh' + this.uuid;
    this.$refs.uuid.id = this.uuid;
    if (this.baseCode) {
      this.code = this.baseCode;
      this.renderCode(this.baseCode);
    }
    this.$refs.editor.id = `editor-${this.uuid}`;
    this.editor = ace.edit(this.$refs.editor.id);
    this.editor.getSession().setMode('ace/mode/html');
    this.editor.setTheme('ace/theme/monokai');
    this.code = Pretty(this.code);
    this.editor.setValue(this.code);
    let len = this.editor.getSession().getDocument().getLength();
    this.$refs.editor.style.height = len*16 + "px";
    this.editor.getSession().on('change', function() {
      self.editorCode = self.editor.getSession().getValue();
      self.renderCode(self.editorCode)
    });
  },

  updated() {
    // if (this.updateTimer) {
    //   clearTimeout(this.updateTimer)
    // }
    // this.updateTimer = setTimeout(this.renderComponent, 200);
  },

  methods: {
    // renderComponent() {
    //   this.$refs.component.innerHTML = this.code;
    // },

    renderCode(code) {
      let res = Vue.compile(`<div id="${this.uuid}">${code}</div>`);
      new Vue({
        render: res.render,
        staticRenderFns: res.staticRenderFns
      }).$mount(`#${this.uuid}`);
      
    }
  }
}