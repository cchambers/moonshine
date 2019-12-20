<template>
  <div class="tool-banner active" :layout="layout" :code-focus="codeFocus">
    <div class="detail">
      <div class="bar">
        <component v-bind:is="dropnav" id="toolbar-orient" event-only>
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
        </component>
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
        <div class="panel">
          <h2>
            Rows
          </h2>
          <ul>
            <li>
              <a href="#">r1</a>
            </li>
            <li>
              <a href="#">r2</a>
            </li>
            <li>
              <a href="#">r3</a>
            </li>
            <li>
              <a href="#">r4</a>
            </li>
            <li>
              <a href="#">+ Add Row</a>
            </li>
          </ul>

          <h2>
            Selection
          </h2>
          <ul>
            <li ref="colors">
              <div class="swatches">
                <div class="swatch foreground"
                @click="toggleOptions"
                :style="{ background: selection.foreground }"></div>
                <div class="options panel">
                  foreground
                  <div v-for="(category, val) in colors"
                  v-bind:key="val.id" class="cat">
                    <div class="name">{{ val }}</div>
                    <div v-for="color in category"
                    v-bind:key="color" :class="'ex back-'+color"></div>
                  </div>
                </div>
                <div class="swatch background"
                @click="toggleOptions"
                :style="{ background: selection.background }"></div>
                <div class="options panel">
                  background
                  <div v-for="(category, val) in colors"
                  v-bind:key="val.id" class="cat">
                    <div class="name">{{ val }}</div>
                    <div v-for="color in category"
                    v-bind:key="color" :class="'ex back-'+color"></div>
                  </div>
                </div>
              </div>
            </li>
            <li ref="typography">
              Typopgrahy
              <div class="options">
                <div class="cat">Name</div>
                <div class="cat">Size</div>
                <div class="cat">Weight</div>
                <div class="cat">Style</div>
                <div class="cat">Casing</div>
              </div>
            </li>
            <li>
              <a href="#">Box Model</a>
              <div class="options">
                <div class="cat">Padding</div>
                <div class="cat">Margin</div>
                <div class="cat">Border</div>
              </div>
            </li>
            <li>
              <a href="#">Position</a>
              <div class="options">
                <div class="cat">Static</div>
                <div class="cat">Relative</div>
                <div class="cat">Absolute</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="constrain" v-html="html"></div>
      </div>
      <div class="editors">
        <div class="editor" ref="editor"></div>
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
import ShDropnav from '../../../../components/sh-dropnav/Dropnav.vue';

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
      dropnav: ShDropnav,
      focused: null,
      selection: {
        foreground: 'green',
        background: 'red',
      },
      colors: {
        highlights: [
          'highlight-primary',
          'highlight-secondary',
          'highlight-tertiary',
          'highlight-quaternary',
          'highlight-quinary',
        ],
        lowlights: [
          'lowlight-primary',
          'lowlight-secondary',
          'lowlight-tertiary',
          'lowlight-quaternary',
          'lowlight-quinary',
        ],
        accents: [
          'accent-primary',
          'accent-secondary',
          'accent-tertiary',
          'accent-quaternary',
          'accent-quinary',
          'belkblue',
          'wildfuscia',
          'classicblue',
          'deepteal',
          'festivelime',
          'goldenhour',
          'peachyred',
          'mysticpurple',
        ],
      },
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

    setTimeout(() => {
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

      self.$refs.editor.style.width = '100%';
      self.editor.resize();
      self.editor.getSession().selection.clearSelection();
      self.editor.getSession().on('change', this.handleChange);
      this.handleChange();
    }, 200);
  },

  methods: {
    events() {
      this.$bus.$on('code-focus', this.codeFocusHandler);
      this.$bus.$on('dropnav-value-changed', (data) => {
        if (data.el.id === 'toolbar-orient') {
          // console.log(`Orient to: ${data.value}`);
        }
      });

      const constrain = document.querySelector('.constrain');

      document.addEventListener('click', (e) => {
        if (constrain.contains(e.target)) {
          e.stopPropagation();
          const active = document.querySelector('[banner-row].active');
          if (active) active.classList.remove('active');
          const crow = e.target.closest('[banner-row]');
          if (crow) crow.classList.add('active');
        }
      });
    },

    handleChange() {
      const value = this.editor.getSession().getValue();
      this.editorCode = value;
      this.html = this.editorCode;
      this.setItem('tool-banner-data', value);
    },

    codeFocusHandler(data) {
      this.codeFocus = data.value;
      setTimeout(() => {
        this.$bus.$emit('resize-occurred');
      }, 100);
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

    toggleOptions(e) {
      document.querySelectorAll('.options.active').forEach((el) => {
        el.classList.remove('active');
      });
      const opt = e.target;
      console.log(opt, opt.closest('div.options'));
      opt.classList.add('active');
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
