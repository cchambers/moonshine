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
        <sh-button :disabled="!changedNotRendered" @click="renderEditorCode">RENDER</sh-button>
        <!-- <sh-button @click="loadFromLocal">LOAD LS</sh-button> -->
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
                <div
                  class="swatch background"
                  :class="selection.background"
                ></div>
              </div>
              <div v-for="(category, val) in colors" v-bind:key="val.id" class="cat">
                  <div class="name">{{ val }}</div>
                  <div v-for="color in category"
                  v-bind:key="color" :class="'ex back-'+color"></div>
                </div>
            </li>
            <li ref="typography">
              Typograhy
              <div class="options">
                <div class="cat">Name: {{ selection.fontname }}</div>
                <div class="cat">Size: {{ selection.fontsize }}</div>
                <div class="cat">Line-Height: {{ selection.lineheight }}</div>
                <div class="cat">Weight: {{ selection.fontweight }}</div>
                <div class="cat">
                  Style: <div class="options">
                    <sh-button toggle group="style" variant="primary">
                      [none]
                    </sh-button>
                    <sh-button toggle group="style" variant="primary">
                      <em>italic</em>
                    </sh-button>
                  </div>
                </div>
                <div class="cat">Deco: {{ selection.decoration }}</div>
                <div class="cat">Casing: {{ selection.casing }}</div>
              </div>
            </li>
            <li>
              <a href="#">Box Model</a>
              <div class="options">
                <div class="cat">Padding: {{ selection.padding }}</div>
                <div class="cat">Margin: {{ selection.margin }}</div>
                <div class="cat">Border: {{ selection.border }}</div>
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
// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')
// const adapter = new FileSync('db.json')
// const db = low(adapter)

export default {
  mixins: [ComponentPrototype],
  name: 'ToolBanner',

  data() {
    return {
      active: false,
      activeEl: {},
      changedNotRendered: false,
      fullscreen: false,
      isActive: false,
      editorCode: '',
      html: '...',
      updateTimer: 0,
      uniqueId: '',
      key: 0,
      editor: {},
      layout: 't',
      codeFocus: 'all',
      dropnav: ShDropnav,
      focused: null,
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
      struct: [],
      content: {},
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
      // update localStorage when this variable changes
      this.setItem('tool-banner-data', val);
    },

    content(val) {
      // update localStorage when this variable changes
      this.setItem('tool-banner-content', { ...val });
    },

    html() {
      this.updateEditor();
    },
  },

  created() {
    this.setUUID();
  },

  mounted() {
    const self = this;
    self.uniqueId = `sh${self.uuid}`;
    setTimeout(() => {
      self.$refs.editor.id = `editor-${self.uniqueId}`;
      self.editor = ace.edit(self.$refs.editor.id);
      self.editor.setOptions({
        wrapBehavioursEnabled: true,
        // showLineNumbers: false,
        // showGutter: false,
        wrap: true,
        showPrintMargin: false,
        indentedSoftWrap: false,
      });
      self.editor.getSession().setMode('ace/mode/html');
      self.editor.setTheme('ace/theme/monokai');
      self.$refs.editor.style.width = '100%';
      self.editor.resize();
      self.editor.getSession().on('change', () => {
        this.changedNotRendered = true;
      });
      if (self.checkLocalStorage()) this.loadFromLocal();
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
          const active = document.querySelector('[banner-block="active"]');
          if (active) {
            active.setAttribute('banner-block', '');
            this.activeEl = {};
          }
          const crow = e.target.closest('[banner-block]');
          if (crow) {
            crow.setAttribute('banner-block', 'active');
            this.activeEl = crow;
            this.panelData(crow.classList);
          }
        }
      });
    },

    checkLocalStorage() {
      const content = this.getItem('tool-banner-content');
      if (content) this.content = content;
      const data = this.getItem('tool-banner-data');
      if (data) this.struct = data;
      return (content && data);
    },

    loadFromLocal() {
      if (this.checkLocalStorage()) {
        const code = this.markup(this.struct);
        this.renderCode(code);
      }
    },

    updateEditor() {
      this.editor.setValue(Pretty(this.html));
      this.editor.getSession().selection.clearSelection();
    },

    codeFocusHandler(data) {
      this.codeFocus = data.value;
      setTimeout(() => {
        this.$bus.$emit('resize-occurred');
      }, 100);
    },

    // renderDebounce(code) {
    //   const self = this;
    //   clearTimeout(this.updateTimer);
    //   this.updateTimer = setTimeout(self.renderCode, 300);
    // },

    renderEditorCode() {
      const value = this.editor.getSession().getValue();
      const compiles = this.json(value);
      if (compiles) {
        this.struct = compiles;
        const code = this.markup(this.struct);
        this.renderCode(code);
      }
      this.changedNotRendered = false;
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
      opt.classList.add('active');
    },

    markup(arr) {
      let str = '';
      if (arr) {
        const self = this;
        arr.forEach((item) => {
          str += self.makeHTML(item);
        });
      }
      return str;
    },

    makeHTML(item) {
      const self = this;
      let attributes = '';

      const innerHTML = (item.contentKey) ? self.content[item.contentKey]
        : self.markup(item.children);

      if (item.attributes) attributes = self.attributeHTML(item.attributes);
      console.log(item.bannerBlock);
      return `<${item.element}${attributes}${(item.bannerBlock) ? ' banner-block' : ''}>${innerHTML}</${item.element}>`;
    },

    json(markup) {
      const element = document.createElement('div');
      element.innerHTML = markup;
      const json = element.children;
      this.key = 0;
      this.content = [];
      const structure = this.makeJSON(json);
      // console.log('STRUCT', structure);
      return structure;
    },

    makeJSON(array) {
      const newArray = [];
      array.forEach((el) => {
        const data = {
          element: el.tagName.toLowerCase(),
        };
        const attr = this.attributeJSON(el.attributes);
        if (attr) data.attributes = attr;
        if (el.children.length) {
          const inline = this.hasInlineChildren(el.children);
          if (inline) {
            data.contentKey = this.keyContent(el.innerHTML);
          } else {
            data.children = this.makeJSON(el.children);
          }
        } else if (el.innerText) {
          data.contentKey = this.keyContent(el.innerText);
        }
        if (el.hasAttribute('banner-block')) data.bannerBlock = true;
        newArray.push(data);
      });
      return newArray;
    },

    attributeJSON(arr) {
      const newArray = [];
      arr.forEach((item) => {
        if (item.name === 'banner-block') return;
        const obj = {};
        const key = (item.name === 'class') ? 'className' : item.name;
        obj[key] = item.value;
        newArray.push(obj);
      });
      const toReturn = (newArray.length) ? newArray : false;
      return toReturn;
    },

    keyContent(str) {
      let theKey = false;
      Object.keys(this.content).forEach((item) => {
        if (this.content[item] === str) {
          theKey = item;
        }
      });
      if (!theKey) {
        this.key += 1;
        theKey = this.key;
      }
      const key = `key-${theKey}`;
      this.$set(this.content, key, str);
      return key;
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
              case 'wt':
                which = 'fontweight';
                break;
              case 'px':
                which = 'fontsize';
                break;
              case 'lh':
                which = 'lineheight';
                break;
              case 'case':
                which = 'casing';
                break;
              case 'ration':
                which = 'rationration';
                break;
              case 'style':
                which = 'style';
                break;
              case 'color':
                which = 'foreground';
                split.shift();
                mod = split.join('-');
                break;
              case 'pad':
                which = 'padding';
                break;
              default:
                break;
            }
            if (which) data[which] = mod;
          }
        }
      });
      this.$set(this, 'selection', data);
    },

    attributeHTML(arr) {
      let attr = '';
      const test = arr[0];
      Object.keys(test).forEach((item) => {
        const prop = (item === 'className') ? 'class' : item;
        attr += ` ${prop}="${test[item]}"`;
      });
      return (attr.length) ? attr : false;
    },

    hasInlineChildren(children) {
      let inline = false;
      const inlines = ['span', 'strong', 'em', 'img'];
      children.forEach((child) => {
        const isInline = (inlines.indexOf(child.tagName.toLowerCase()) > -1);
        if (isInline) inline = true;
      });
      return inline;
    },

    getDisplayStyle(element) {
      const cStyle = element.currentStyle || window.getComputedStyle(element, '');
      return cStyle.display;
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
