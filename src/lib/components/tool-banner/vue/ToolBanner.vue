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
        <sh-button
          toggle
          group="breakpoint"
          click-event="code-focus"
          default-value="code-all"
          active
        >ALL</sh-button>
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
          <h2>Selection</h2>
          <ul>
            <li ref="colors">
              <div class="swatches">
                <div
                  class="swatch foreground"
                  :class="'back-'+selection.foreground"
                ></div>
                <div class="options panel">
                  foreground
                  <div v-for="(category, val) in colors" v-bind:key="val.id" class="cat">
                    <div class="name">{{ val }}</div>
                    <div v-for="color in category"
                    v-bind:key="color" :class="'ex back-'+color"></div>
                  </div>
                </div>
                <div
                  class="swatch background"
                  :class="selection.background"
                ></div>
                <div class="options panel">
                  background
                  <div v-for="(category, val) in colors" v-bind:key="val.id" class="cat">
                    <div class="name">{{ val }}</div>
                    <div v-for="color in category"
                    v-bind:key="color" :class="'ex back-'+color"></div>
                  </div>
                </div>
              </div>
            </li>
            <li ref="typography">
              Typograhy
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

  data() {
    return {
      active: false,
      activeEl: {},
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
      struct: [{
        element: 'sh-banner',
        attributes: {
          variant: 'primary',
          className: 'test highlight-primary',
        },
        children: [{
          element: 'div',
          attributes: {
            className: 'wt-600 back-wildfuscia color-mysticpurple',
          },
          children: [{
            element: 'p',
            contentKey: 'p-1',
          }],
        },
        {
          element: 'div',
          attributes: {
            className: 'wt-600 back-classicblue color-highlight-secondary',
          },
          children: [{
            element: 'p',
            contentKey: 'p-1',
          }],
        }],
      }],
      content: {
        'p-1': 'Test content...',
      },
      config: {
        adaptive: false,
        adaptiveCode: {
          def: null,
          sm: null,
          md: null,
          lg: null,
          xl: null,
        },
        variant: 'default',
      },
      selection: {
        foreground: 'none',
        background: 'none',
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

  watch: {
    struct(val) {
      console.log('STRUCTURE UPDATED', val);
    },
  },

  created() {
    this.setUUID();
  },

  mounted() {
    const self = this;

    this.uniqueId = `sh${this.uuid}`;
    // const data = self.getItem('tool-banner-data');
    // if (data) self.code = data;
    setTimeout(() => {
      self.$refs.editor.id = `editor-${self.uniqueId}`;
      self.editor = ace.edit(self.$refs.editor.id);
      self.editor.getSession().setMode('ace/mode/html');
      self.editor.setTheme('ace/theme/monokai');
      self.$refs.editor.style.width = '100%';
      self.editor.resize();

      self.updateEditor();

      // self.editor.getSession().on('change', self.handleChange);
      const code = self.markup(self.struct);
      self.renderCode(code);
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
          const active = document.querySelector('div.active');
          if (active) {
            active.classList.remove('active');
            this.activeEl = {};
          }
          const crow = e.target.closest('div');
          if (crow) {
            crow.classList.add('active');
            this.activeEl = crow;
            this.panelData(crow.classList);
          }
        }
      });
    },

    updateEditor() {
      const self = this;
      self.code = Pretty(self.code);
      self.editor.setValue(self.code);
      self.editor.setOptions({
        wrapBehavioursEnabled: true,
        showLineNumbers: false,
        showGutter: false,
        wrap: true,
        showPrintMargin: false,
        indentedSoftWrap: false,
      });
      self.editor.getSession().selection.clearSelection();
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
      this.code = code;
      this.updateEditor();
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
      opt.classList.add('active');
    },

    markup(obj) {
      let html = '';
      const self = this;
      obj.forEach((item) => {
        html += self.make(item);
      });
      return html;
    },

    make(item) {
      const self = this;
      let innerHTML = '';
      let attributes = '';
      console.log(item);
      innerHTML = (item.contentKey) ? self.content[item.contentKey] : self.markup(item.children);
      if (item.attributes) attributes = ` ${self.attribute(item.attributes)}`;
      return `<${item.element}${attributes}>${innerHTML}</${item.element}>`;
    },

    panelData(classes) {
      const data = {};
      classes.forEach((thing) => {
        const split = thing.split('-');
        if (split.length > 1) {
          let which = split[0];
          if (which !== 'active') {
            let mod = thing;
            switch (which) {
              case 'back':
                which = 'background';
                break;
              case 'color':
                which = 'foreground';
                split.shift();
                mod = split.join('-');
                break;
              default:
                break;
            }
            console.log(split);
            if (which) data[which] = mod;
          }
        }
      });
      console.log(data);
      this.$set(this, 'selection', data);
      console.log(this.selection);
    },

    attribute(arr) {
      let attr = '';
      Object.keys(arr).forEach((item) => {
        const prop = (item === 'className') ? 'class' : item;
        console.log(item, arr[item]);
        attr += ` ${prop}="${arr[item]}"`;
      });
      return attr;
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
