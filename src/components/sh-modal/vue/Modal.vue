
<template>
  <div class="sh-modal" role="dialog"
    :variant="variant"
    :class="{ fullscreen: fullscreen, active: active }"
    :reveal="reveal"
    :id="uniqueId"
    :aria-labelledby="ariaID"
    :aria-describedby="ariaDescID">
    <div class="content" :class="customClass" :size="size">
      <div class="tab-lock" v-on:focus="focusLast()" tabindex="0"></div>
      <div v-if="!hideHeader" class="header">
        <div v-if="header" class="modal-title">
          <h3 :id="ariaHeaderID">
            <slot name="header">{{ header }}</slot>
          </h3>
        </div>
      </div>
      <div class="body" ref="body" :id="ariaDescID" tabindex="-1">
        <div v-if="contentUrl && !loaded" class="loading-anim" v-html="loadHtml"></div>
        <template>
          <slot>{{ content }}</slot>
        </template>

      </div>
      <div class="footer" v-if="footer">
        <slot name="footer">{{ footer }}</slot>
      </div>
      <div class="tab-lock" v-on:focus="focusFirst()" tabindex="0"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-restricted-globals */
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Modal',

  props: {
    uniqueId: {
      type: String,
      required: true,
    },
    closeIcon: {
      type: String,
      default: 'close',
    },
    content: String,
    contentUrl: String,
    loadedUrl: String,
    contentSelector: String,
    customClass: String,
    dynamicHTML: String,
    noHistory: Boolean,
    hideHeader: Boolean,
    fullscreen: Boolean,
    openTriggerEvent: String,
    openedEvent: String,
    closeTriggerEvent: String,
    closedEvent: String,
    focusTarget: String,
    header: String,
    footer: String,
    reveal: String,
    variant: String,
    overlay: String,
    printable: Boolean,
    startOpen: Boolean,
    formTarget: String,
    size: String,
  },

  data() {
    return {
      triggers: [],
      closeTriggers: [],
      container: null,
      loaded: false,
      loading: false,
      active: false,
      blockHistory: false,
      ariaID: String,
      ariaHeaderID: String,
      ariaDescID: String,
      loadHtml: `<div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>`,
    };
  },

  mounted() {
    const self = this;
    self.modals = self.$el.querySelectorAll('.modal');
    self.ariaID = `aria-${self.uniqueId}`;
    self.ariaHeaderID = `aria-header-${self.uniqueId}`;
    self.ariaDescID = `aria-desc-${self.uniqueId}`;
    const container = document.querySelector('#sh-modals');
    if (container) {
      self.container = container;
      self.mountToContainer();
    } else {
      self.createContainer();
    }
    if (window.location.hash) {
      self.hashHandler({
        hash: window.location.hash.substr(1),
        event: false,
      });
    }

    if (self.openTriggerEvent) self.$bus.$on(self.openTriggerEvent, self.open);
    if (self.closeTriggerEvent) self.$bus.$on(self.closeTriggerEvent, self.close);

    if (self.startOpen) this.open();
  },

  methods: {
    doPrint() {
      window.print();
    },

    serialize(form) {
      // Setup our serialized data
      const serialized = [];

      // Loop through each field in the form
      for (let i = 0; i < form.elements.length; i += 1) {
        const field = form.elements[i];
        if (!field.name
          || field.disabled
          || field.type === 'file'
          || field.type === 'reset'
          || field.type === 'submit'
          || field.type === 'button') {
          // eslint-disable-next-line
          continue;
        }

        // If a multi-select, get all selections
        if (field.type === 'select-multiple') {
          for (let n = 0; n < field.options.length; n += 1) {
            // eslint-disable-next-line
            if (!field.options[n].selected) continue;
            const name = encodeURIComponent(field.name);
            const value = encodeURIComponent(field.options[n].value);
            serialized.push(`${name}=${value}`);
          }
        } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
          const name = encodeURIComponent(field.name);
          const value = encodeURIComponent(field.value);
          serialized.push(`${name}=${value}`);
        }
      }

      return serialized.join('&');
    },

    focusFirst() {
      const { filter } = Array.prototype;
      const els = this.$el.querySelectorAll('a, input, button, [tabindex], [close-trigger]');
      const filtered = filter.call(els, (node) => !node.classList.contains('tab-lock'));
      if (filtered) filtered[0].focus();
    },

    focusLast() {
      const { filter } = Array.prototype;
      const els = this.$el.querySelectorAll('a, input, button, [tabindex], [close-trigger]');
      const filtered = filter.call(els, (node) => !node.classList.contains('tab-lock'));
      if (filtered) filtered[filtered.length - 1].focus();
    },

    events() {
      const self = this;
      this.configureTriggers();

      self.$bus.$on('close-modals', this.close);
      self.$bus.$on('modal-opening', () => {
        self.close(false);
      });

      self.$bus.$on('open-modal', (data) => {
        if (data.url !== this.loadedUrl) this.contentUrl = data.url;
        if (data.id === this.uniqueId) this.open();
      });

      window.addEventListener('keyup', (e) => {
        const key = e.keyCode;
        if (key === 27) self.$bus.$emit('close-modals'); // esc
      });

      self.$bus.$on('hashchange', this.hashHandler);
    },

    hashHandler(data) {
      const { hash, event } = data;
      if (hash === '') {
        if (this.active) this.close(false);
      } else if (hash === this.uniqueId) {
        if (event) event.preventDefault();
        this.open();
      }
    },

    open() {
      if (!this.loaded && this.contentUrl) {
        if (this.contentUrl !== this.loadedUrl) this.loadContent();
      }

      if (this.overlay) {
        this.container.setAttribute('overlay', this.overlay);
      } else {
        this.container.removeAttribute('overlay');
      }

      if (!this.active) {
        this.$bus.$emit('modal-opening', this.uniqueId);
        document.documentElement.classList.add('sh-modal-open');
        this.active = true;
        this.$el.focus();
        this.$bus.$emit('modal-opened', this.uniqueId);
        if (this.openedEvent) this.$bus.$emit(this.openedEvent, this.uniqueId);
      }

      if (this.focusTarget) {
        const target = this.$el.querySelector(this.focusTarget);
        if (target) target.focus();
      }
    },

    close(clearHash = true) {
      if (this.active) {
        this.$bus.$emit('modal-closing', this.uniqueId);
        document.documentElement.classList.remove('sh-modal-open');
        this.active = false;
        this.$bus.$emit('modal-closed', this.uniqueId);
        if (this.closedEvent) this.$bus.$emit(this.closedEvent, this.uniqueId);
      }
      if (clearHash) this.clearHash();
    },

    clearHash() {
      let scrollV;
      let scrollH;
      const loc = window.location;
      if ('pushState' in history) {
        if (!this.noState) {
          history.pushState('', document.title, loc.pathname + loc.search);
        } else {
          history.replaceState('', document.title, loc.pathname + loc.search);
        }
      } else {
        // Prevent scrolling by storing the page's current scroll offset
        scrollV = document.body.scrollTop;
        scrollH = document.body.scrollLeft;
        loc.hash = '';
        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scrollV;
        document.body.scrollLeft = scrollH;
      }
    },

    loadContent() {
      this.loading = true;
      this.ajax();
    },

    configureTriggers() {
      const self = this;
      const selector = `[modal-trigger="${self.uniqueId}"]`;
      self.triggers = document.querySelectorAll(selector);
      for (let x = 0; x < self.triggers.length; x += 1) {
        const el = self.triggers[x];
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.hash = `#${self.uniqueId}`;
        });
      }

      const closeSelector = '[close-trigger]';
      self.closeTriggers = self.$el.querySelectorAll(closeSelector);

      for (let y = 0; y < self.closeTriggers.length; y += 1) {
        const el = self.closeTriggers[y];
        el.addEventListener('click', self.close);
      }
    },

    createContainer() {
      const self = this;
      const container = document.createElement('div');
      container.id = 'sh-modals';
      container.innerHTML = `
      <div class="modal-buttons">
        <button close-trigger>
          <belk-icon name="close" width="32">Close Button</belk-icon>
        </button>
        <button print-trigger hidden>
          <belk-icon name="print" width="32">Print Content</belk-icon>
        </button>
      </div>`;
      document.body.appendChild(container);
      self.container = container;
      self.container.addEventListener('click', (e) => {
        if (e.target === self.container) self.$bus.$emit('close-modals');
      });
      self.mountToContainer();
    },

    mountToContainer() {
      const self = this;
      const id = self.uniqueId;
      const exists = document.querySelector(`#sh-modals #${id}`);
      if (exists) exists.remove();
      setTimeout(() => {
        self.container.appendChild(self.$el);
      });
    },

    doError() {
      this.$refs.body.innerHTML = `<p class="error">There was a problem loading content from <a href='${window.location.host}${this.contentUrl}'>${window.location.host}${this.contentUrl}</a>.</p>`;
    },

    ajax(data = null) {
      const self = this;
      const xhr = new XMLHttpRequest();
      const method = (data === null) ? 'GET' : 'POST';
      let postData = data;
      xhr.open(method, self.contentUrl, true);
      if (method === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        if (self.formTarget) {
          const form = document.querySelector(self.formTarget);
          if (form) postData = self.serialize(form);
        }
      }
      xhr.send(postData);
      xhr.onreadystatechange = () => {
        const DONE = 4;
        const OK = 200;
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            self.loaded = true;
            let response = xhr.responseText;
            const pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
            const arr = pattern.exec(response);
            if (!arr) {
              response = xhr.responseText;
            } else {
              // eslint-disable-next-line
              response = arr[1];
            }
            // eslint-disable-next-line
            let html = document.createElement('div');
            html.innerHTML = response;

            if (self.contentSelector) {
              const contentTarget = html.querySelector(self.contentSelector);
              if (contentTarget) html = contentTarget;
              html = contentTarget;
            }

            if (!html) {
              self.doError();
            } else {
              self.$refs.body.appendChild(html);
              self.loadedUrl = self.contentUrl;
            }
          } else {
            self.doError();
          }
        }
      };
    },
  },
};
</script>

<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
<style lang="scss" src="../style/secondary.scss"></style>
<style lang="scss">
  a[modal-trigger] {
    color: $accent-primary;
  }

  #sh-modals {
    position: fixed;
    pointer-events: none;
    max-height: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 90;
    opacity: 0;
    background: rgba(0, 0, 0, 0.8);
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    transition: opacity 150ms ease;
    .modal-buttons {
      position: fixed;
      z-index: 2;
      display: none;
      pointer-events: all;
      flex-direction: column;
      right: 0;
      top: 0rem;
      color: $lowlight-primary;
      @include md {
        top: 13rem;
        color: $highlight-primary;
      }
      @include lg {
        left: calc(100% / 2 + 39.5rem);
      }
      button {
        display: flex;
        height: 5rem;
        width: 5rem;
        align-content: center;
        justify-content: center;
        color: inherit;
        background: transparent;
        cursor: pointer;
        border: none;
        outline: none;
        transition: all 150ms $decel;
        transform: scale(1) translateX(0);
        transform-origin: center center;
        &:hover,
        &:focus {
          transform: scale(1.3) translateX(0);
        }
        > belk-icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }

    &[overlay] {
      &[overlay="none"] {
        background: transparent;
        .content {
          @include box-shadow(2);
        }
      }
      /* Generate background colors for every bg */
      @each $name, $hex in $colors {
        &[overlay="#{$name}"] {
          @include background-opacity($hex, 0.5);
        }
      }
    }
  }

  html {
    &.sh-modal-open {
      > * {
        overflow: hidden !important;
      }

      #sh-modals {
        opacity: 1;
        pointer-events: initial;
        max-height: initial;
        overflow-y: auto;
        .modal-buttons {
          display: flex;
        }
      }
    }
  }
</style>
