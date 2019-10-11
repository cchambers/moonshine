import * as ace from 'brace';
import 'brace/mode/html';
import 'brace/theme/monokai';
import Pretty from 'pretty';
import ComponentPrototype from '../../../../components/component-prototype';

export default {
  mixins: [ComponentPrototype],
  name: 'LibToolbar',

  props: {
    baseCode: String,
    demo: String,
  },

  data() {
    return {
      active: false,
      fullscreen: false,
      isActive: false,
      code: '',
      editorCode: '',
      html: 'Loading...',
      updateTimer: 0,
      uniqueId: '',
      editor: {},
    };
  },

  created() {
    this.setUUID();
  },

  mounted() {
    const self = this;
    this.uniqueId = `sh${this.uuid}`;
    if (this.demo) {
      this.$el.addEventListener('click', () => {
        window.open(`${window.location.origin}/${this.demo}`, 'demo');
      });
    }
    if (this.baseCode) {
      this.code = this.baseCode;
      this.renderCode(this.baseCode);
      // this.$el.parentNode.removeAttribute('base-code');
    }
    this.$refs.editor.id = `editor-${this.uniqueId}`;
    this.editor = ace.edit(this.$refs.editor.id);
    this.editor.getSession().setMode('ace/mode/html');
    this.editor.setTheme('ace/theme/monokai');
    this.code = Pretty(this.code);
    this.editor.setValue(this.code);
    this.editor.setOptions({
      wrapBehavioursEnabled: true,
      showLineNumbers: false,
      showGutter: false,
      wrap: true,
      showPrintMargin: false,
      indentedSoftWrap: false,
    });

    setTimeout(() => {
      const len = self.editor.getSession().getDocument().getLength();
      self.$refs.editor.style.height = `${Math.max(200, Math.min(len * 21, 600))}px`;
      self.$refs.editor.style.width = '100%';
      self.editor.resize();
      self.editor.getSession().selection.clearSelection();

      self.editor.getSession().on('change', () => {
        const value = self.editor.getSession().getValue();
        self.editorCode = value;
        self.html = self.editorCode;
      });
    });
  },

  methods: {
    renderDebounce(code) {
      const self = this;
      clearTimeout(this.updateTimer);
      this.updateTimer = setTimeout(() => {
        self.renderCode(code);
      }, 300);
    },

    events() {
      // this.$bus.$on('hashchange', () => {
      //   // console.log("got it")
      // })
    },

    renderCode(code) {
      this.html = code;
    },

    toggleActive() {
      this.active = !this.active;
    },

    toggleFullscreen() {
      this.fullscreen = !this.fullscreen;
      if (this.fullscreen) {
        document.documentElement.classList.add('toolbar-fullscreen');
      } else {
        document.documentElement.classList.remove('toolbar-fullscreen');
      }
    },

    copyEditor() {
      // console.log("COPY")
    },
  },

  updated() {
    this.isActive = this.active;
  },
};
