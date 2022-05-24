<template>
  <div class="sh-modal" role="dialog"
    :variant="variant"
    :class="{
      fullscreen: fullscreen,
      active: active
    }"
    :reveal="reveal"
    :id="uniqueId"
    :aria-labelledby="ariaID"
    :aria-describedby="ariaDescID">
    <div class="content" ref="content" :class="{ 'no-space': noSpace }" :size="size">
      <div class="tab-lock" v-if="active" v-on:focus="modalButtonsFocus()" tabindex="0"></div>
      <div v-if="!hideHeader" class="header">
        <div v-if="header" class="modal-title">
          <h3 :id="ariaHeaderID">
            <slot name="header">{{ header }}</slot>
          </h3>
        </div>
      </div>
      <div class="body" :style="{ 'max-width': maxWidth }" ref="body" :id="ariaDescID">
        <div v-if="contentUrl && !loaded" class="loading-anim" v-html="loadHtml"></div>
        <template v-if="!dynamicHTML">
          <slot>{{ content }}</slot>
        </template>
        <div v-if="dynamicHTML" v-html="dynamicHTML"></div>
        <div ref="ajax"></div>

      </div>
      <div class="footer">
        <slot name="footer">{{ footer }}</slot>
      </div>
      <div class="tab-lock" v-if="active" v-on:focus="modalButtonsFocus()" tabindex="0"></div>
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
    alwaysReload: Boolean,
    confirmationEvents: Boolean,
    contentSelector: String,
    customClass: String,
    maxWidth: String,
    noHistory: Boolean,
    hideHeader: Boolean,
    hideButtons: Boolean,
    fullscreen: Boolean,
    openTriggerEvent: String,
    openedEvent: String,
    noEvents: Boolean,
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
      triggerLinks: [],
      affirmTriggers: [],
      closeTriggers: [],
      rejectTriggers: [],
      container: null,
      loaded: false,
      loadedUrl: String,
      loading: false,
      active: false,
      affirmed: undefined,
      blockHistory: false,
      ariaID: String,
      ariaHeaderID: String,
      ariaDescID: String,
      links: Array,
      noSpace: false,
      openedCallback: undefined,
      closedCallback: undefined,
      dynamicHTML: undefined,
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
    self.links = self.$el.querySelectorAll('a, input, button, [tabindex]:not(.tab-lock), [close-trigger]');
    const container = document.querySelector('#sh-modals');
    if (this.customClass) this.$refs.content.classList.add(this.customClass);
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
    if (self.startOpen) self.open();
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
      if (this.links.length === 0) {
        this.modalButtonsFocus();
      } else {
        this.links[0].focus();
      }
    },

    focusLast() {
      if (this.links.length === 0) {
        this.modalButtonsFocus();
      } else {
        this.links[this.links.length - 1].focus();
      }
    },

    modalButtonsFocus() {
      this.$bus.$emit('modal-buttons-focus');
    },

    events() {
      const self = this;
      this.configureTriggers();

      self.$bus.$on('modal-focus-first', () => {
        if (this.active) self.focusFirst();
      });

      self.$bus.$on('modal-focus-last', () => {
        if (this.active) self.focusLast();
      });

      self.$bus.$on('close-modals', () => {
        if (this.active) {
          if (this.confirmationEvents) {
            // if (this.affirmed) {
            //   // self.$bus.$emit('modal-affirmed', self.uniqueId);
            // } else {
            self.$bus.$emit('modal-rejected', self.uniqueId);
            // }
          }
          this.close(true, 'close-modals event');
        }
      });

      self.$bus.$on('modal-opening', () => {
        self.close(false, 'modal-opening');
      });

      self.$bus.$on('open-modal', (data) => {
        if (data.url && data.url !== this.loadedUrl) this.loadedUrl = data.url;
        if (data.id === this.uniqueId) this.open();
      });

      self.$bus.$on('update-modal', (data) => {
        const { params } = data;
        const which = data.id;
        if (which === self.uniqueId) {
          if (params === 'close') {
            self.close(true, 'update-modal event');
          } else {
            self.paramsHandler(params);
          }
        }
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
        if (this.active) this.close(false, 'hash handler');
      } else if (hash === this.uniqueId) {
        if (event) event.preventDefault();
        this.open();
      }
    },

    paramsHandler(data) {
      const self = this;
      if (data.html) self.dynamicHTML = data.html;
      if (typeof data.open === 'function') self.openedCallback = data.open;
      if (typeof data.close === 'function') self.closedCallback = data.close;
      if (data.url) {
        self.contentUrl = data.url;
        self.loadContent();
      }
      if (data.autoOpen) self.open();
    },

    open() {
      const self = this;

      if (self.confirmationEvents) self.affirmed = undefined;

      if (self.alwaysReload || (!self.loaded && self.contentUrl)) {
        if (self.alwaysReload || (self.contentUrl !== self.loadedUrl)) self.loadContent();
      }

      if (self.overlay) {
        self.container.setAttribute('overlay', self.overlay);
      } else {
        self.container.removeAttribute('overlay');
      }

      if (!self.active) {
        if (!self.noEvents) self.$bus.$emit('modal-opening', self.uniqueId);
        if (self.hideButtons) self.$bus.$emit('modal-buttons-hide');
        document.documentElement.classList.add('sh-modal-open');
        self.active = true;
        self.$bus.$emit('modal-opened', self.uniqueId);
        if (self.openedEvent) self.$bus.$emit(self.openedEvent, self.uniqueId);
        if (self.openedCallback) self.openedCallback();

        self.manageHeight();

        setTimeout(() => {
          self.$refs.content.focus();
        }, 200);
      }

      if (self.focusTarget) {
        const target = self.$el.querySelector(self.focusTarget);
        if (target) target.focus();
      }
    },

    close(clearHash = true, from) {
      if (from && window.modalDebug) this.log(`modal close from: ${from}`);
      if (this.active) {
        if (!self.noEvents) this.$bus.$emit('modal-closing', this.uniqueId);
        document.documentElement.classList.remove('sh-modal-open');
        this.active = false;
        this.$bus.$emit('modal-closed', this.uniqueId);
        if (this.closedEvent) this.$bus.$emit(this.closedEvent, this.uniqueId);
        if (this.closedCallback) this.closedCallback();
        if (self.alwaysReload) this.loaded = false;
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
      for (let x = 0, l = self.triggers.length; x < l; x += 1) {
        const el = self.triggers[x];
        el.addEventListener('click', (e) => {
          const data = el.dataset;
          e.preventDefault();
          window.location.hash = `#${self.uniqueId}`;
          if (data) {
            self.$bus.$emit('modal-trigger-data', {
              id: self.uniqueId,
              data,
            });
          }
        });
      }

      const triggerLinks = `[href="#${self.uniqueId}"]`;
      self.triggerLinks = document.querySelectorAll(triggerLinks);
      for (let x = 0, l = self.triggerLinks.length; x < l; x += 1) {
        const el = self.triggerLinks[x];
        el.addEventListener('click', () => {
          const data = el.dataset;
          if (data) {
            self.$bus.$emit('modal-trigger-data', {
              id: self.uniqueId,
              data,
            });
          }
        });
      }

      // internal affirmation triggers
      const affirmTriggers = '[affirm-trigger]';
      self.affirmTriggers = self.$el.querySelectorAll(affirmTriggers);
      for (let y = 0; y < self.affirmTriggers.length; y += 1) {
        const el = self.affirmTriggers[y];
        el.addEventListener('click', () => {
          self.affirmed = true;
          if (self.confirmationEvents) self.$bus.$emit('modal-affirmed', self.uniqueId);
        });
      }

      // internal rejection triggers
      const rejectTriggers = '[reject-trigger]';
      self.rejectTriggers = self.$el.querySelectorAll(rejectTriggers);
      for (let y = 0; y < self.rejectTriggers.length; y += 1) {
        const el = self.rejectTriggers[y];
        el.addEventListener('click', () => {
          self.affirmed = false;
          if (self.confirmationEvents) self.$bus.$emit('modal-rejected', self.uniqueId);
        });
      }

      // internal close triggers
      const closeSelector = '[close-trigger]';
      self.closeTriggers = self.$el.querySelectorAll(closeSelector);
      for (let y = 0; y < self.closeTriggers.length; y += 1) {
        const el = self.closeTriggers[y];
        el.addEventListener('click', () => {
          if (!self.noEvents) self.$bus.$emit('close-modals');
        });
      }
    },

    createContainer() {
      const self = this;
      const container = document.createElement('div');
      container.id = 'sh-modals';
      container.innerHTML = '<sh-modal-buttons></sh-modal-buttons>';
      document.body.appendChild(container);
      self.container = container;
      self.container.addEventListener('click', (e) => {
        if (e.target === self.container) self.$bus.$emit('close-modals');
        e.stopPropagation();
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

    manageHeight() {
      if (this.$refs.content.offsetHeight > (window.innerHeight - 160)) {
        this.noSpace = true;
      }
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
              self.$refs.ajax.innerHTML = '';
              self.$refs.ajax.appendChild(html);
              self.loadedUrl = self.contentUrl;
              self.manageHeight();
              self.$bus.$emit('modal-content-loaded', self.uniqueId);
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
    background: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    transition: opacity 150ms ease;
    *:focus {
      outline: 2px solid $accent-tertiary;
    }
    sh-modal-buttons {
      display: none;
      .sh-modal-buttons {
        position: fixed;
        z-index: 2;
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
          left: calc(100% / 2 + 38.7rem);
        }
        button {
          display: flex;
          height: 5rem;
          width: 5rem;
          padding: 0 !important;
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
          @include background-opacity($hex, 0.6);
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
        max-height: 100vh;
        overflow-y: auto;
        sh-modal-buttons {
          display: block;
        }
      }
    }
  }
</style>
