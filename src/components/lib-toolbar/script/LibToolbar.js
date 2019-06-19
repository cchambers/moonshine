// import Vue from 'vue'
import Prism from 'prismjs'

export default {
  name: 'LibToolbar',
  props: {
    baseCode: String,
  },
  data() {
    return {
      code: '',
      html: 'Loading...',
      codeTarget: this.$refs.component,
      updateTimer: 0,
      uuid: ''
    }
  },
  
  mounted() {
    this.uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
    this.uuid = 'sh' + this.uuid;
    this.$refs.uuid.id = this.uuid;
    if (this.baseCode) {
      let code = this.baseCode;
      this.code = Prism.highlight(code, Prism.languages.html, 'html');

      this.renderCode();
    }
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

    renderCode() {
      // let res = Vue.compile(`<div id="${this.uuid}">${this.baseCode}</div>`);
      // new Vue({
      //   render: res.render,
      //   staticRenderFns: res.staticRenderFns
      // }).$mount(`#${this.uuid}`);
      
    }
  }
}