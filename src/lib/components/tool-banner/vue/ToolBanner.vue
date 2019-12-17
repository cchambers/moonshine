<template>
  <div class="tool-banner active" :layout="layout" :code-focus="codeFocus">
    <div class="detail">
      <div class="bar">
        <sh-dropnav event-only>
          <ul>
            <li>
              <a href="#" data-value="t">Top</a>
            </li>
            <li>
              <a href="#" data-value="r">Right</a>
            </li>
            <li>
              <a href="#" data-value="b">Bottom</a>
            </li>
            <li>
              <a href="#" data-value="l">Left</a>
            </li>
          </ul>
        </sh-dropnav>
        <div class="sep"></div>
        <sh-button toggle group="breakpoint"
          click-event="code-focus" default-value="code-all" active>ALL</sh-button>
        <sh-button toggle group="breakpoint"
          click-event="code-focus" default-value="code-xs">XS</sh-button>
        <sh-button toggle group="breakpoint"
          click-event="code-focus" default-value="code-sm">SM</sh-button>
        <sh-button toggle group="breakpoint"
          click-event="code-focus" default-value="code-md">MD</sh-button>
        <sh-button toggle group="breakpoint"
          click-event="code-focus" default-value="code-lg">LG</sh-button>
        <div class="sep"></div>
      </div>
    </div>
    <div class="tool">
      <div ref="component" class="component">
        <div class="constrain" v-html="html"></div>
      </div>
      <div class="editors">
        <div class="editor" ref="editor"></div>
      </div>
    </div>
    <div class="control-wrap">
      <div class="control">
        <sh-button round
        variant="tertiary"
        scale="60"
        v-hammer:tap="copyEditor"
        v-on:keyup.enter="copyEditor">
          <i class="material-icons px20">file_copy</i>
        </sh-button>
        <sh-button round
          variant="secondary"
          scale="60"
          v-hammer:tap="toggleFullscreen"
          v-on:keyup.enter="toggleFullscreen">
          <i class="material-icons px20">fullscreen</i>
        </sh-button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import * as ace from 'brace';
import 'brace/mode/html';
import 'brace/theme/monokai';
import Pretty from 'pretty';
import ComponentPrototype from '../../../../components/component-prototype';

export default {
  mixins: [ComponentPrototype],
  name: 'ToolBanner',

  props: {
    demo: String,
  },

  data() {
    return {
      active: false,
      fullscreen: false,
      isActive: false,
      code: '',
      editorCode: '',
      html: '...',
      updateTimer: 0,
      uniqueId: '',
      editor: {},
      layout: 't',
      codeFocus: 'all',
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
    this.$refs.editor.id = `editor-${this.uniqueId}`;
    this.editor = ace.edit(this.$refs.editor.id);
    this.editor.getSession().setMode('ace/mode/html');
    this.editor.setTheme('ace/theme/monokai');
    const data = this.getItem('tool-banner-data');
    if (data) this.code = data;
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
      self.$refs.editor.style.width = '100%';
      self.editor.resize();
      self.editor.getSession().selection.clearSelection();
      self.editor.getSession().on('change', this.handleChange);
    }, 200);
  },

  methods: {
    events() {
      this.$bus.$on('code-focus', this.codeFocusHandler);
    },

    handleChange() {
      const value = this.editor.getSession().getValue();
      this.editorCode = value;
      this.html = this.editorCode;
      this.setItem('tool-banner-data', value);
    },

    codeFocusHandler(data) {
      this.codeFocus = data.value;
    },

    renderDebounce(code) {
      const self = this;
      clearTimeout(this.updateTimer);
      this.updateTimer = setTimeout(() => {
        self.renderCode(code);
      }, 300);
    },

    renderCode(code) {
      this.html = code;
    },

    copyEditor() {
      const copyTextarea = document.querySelector('#copy-editor');
      copyTextarea.value = this.editor.getValue();
      copyTextarea.select();
      document.execCommand('copy');
      this.$bus.$emit('notify', {
        type: 'default',
        message: 'Copied to clipboard.',
      });
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
  },

  updated() {
    this.isActive = this.active;
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss">
.ace_text-input {
  position: absolute !important;
}
</style>
