<template>
  <div class="belk-drawer" role="dialog"
    :class="{ active: active }"
    :reveal="reveal"
    :drawer="drawer"
    :id="uniqueId"
    :aria-labelledby="ariaID"
    :aria-describedby="ariaDescID">
    <div class="content" ref="content" :size="size">
      <!-- <div class="tab-lock" v-on:focus="focusButton()" tabindex="0"></div> -->
      <div toggle-trigger class="drawer-toggle flex align-top">
        <div v-if="!active">
          <div class="dt-headline">{{ buttonHeadlineInactive }}</div>
          <div class="dt-subhead">{{ buttonSubheadInactive }}</div>
        </div>
        <div v-else>
          <div class="dt-headline">{{ buttonHeadlineActive }}</div>
          <div class="dt-subhead">{{ itemCount }}{{ buttonSubheadActive }}</div>
        </div>
        <div class="dt-icon">
          <belk-icon name="arrow-up" width="16"></belk-icon>
        </div>
      </div>
      <div class="body" :style="{ 'max-width': maxWidth }" ref="body" :id="ariaDescID">
        <slot>{{ content }}</slot>
      </div>
      <!-- <div class="tab-lock" v-on:focus="focusButton()" tabindex="0"></div> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable no-restricted-globals */
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkDrawer',

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
    drawer: String,
    buttonText: String,
    dynamicHTML: String,
    maxWidth: String,
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
    buttonHeadlineActive: String,
    buttonHeadlineInactive: String,
    buttonSubheadActive: String,
    buttonSubheadInactive: String,
    countSelector: String,
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
      openedCallback: undefined,
      closedCallback: undefined,
      // dynamicHTML: undefined,
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

  computed: {
    itemCount() {
      let count = 0;
      if (this.countSelector && this.$el) {
        const els = this.$el.querySelectorAll(this.countSelector);
        count = els.length;
      }
      return count;
    },
  },

  mounted() {
    const self = this;
    self.ariaID = `aria-${self.uniqueId}`;
    self.ariaHeaderID = `aria-header-${self.uniqueId}`;
    self.ariaDescID = `aria-desc-${self.uniqueId}`;
    self.links = self.$el.querySelectorAll('a, input, button, [tabindex]:not(.tab-lock), [close-trigger]');
    const container = (!this.drawer) ? document.querySelector('#belk-drawers') : document.querySelector('#belk-drawer-drawers');
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
        this.focusButton();
      } else {
        this.links[0].focus();
      }
    },

    focusLast() {
      if (this.links.length === 0) {
        this.focusButton();
      } else {
        this.links[this.links.length - 1].focus();
      }
    },

    focusButton() {
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
          this.close();
        }
      });

      self.$bus.$on('modal-opening', () => {
        self.close(false);
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
            self.close();
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
        if (this.active) this.close(false);
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
      if (data.autoOpen) self.open();
    },

    toggle() {
      if (this.active) {
        this.close();
      } else {
        this.open();
      }
    },

    open() {
      const self = this;

      if (self.confirmationEvents) self.affirmed = undefined;

      if (self.overlay) {
        self.container.setAttribute('overlay', self.overlay);
      } else {
        self.container.removeAttribute('overlay');
      }

      if (!self.active) {
        self.$bus.$emit('modal-opening', self.uniqueId);
        document.documentElement.classList.add('belk-drawer-open');
        self.active = true;
        self.$bus.$emit('modal-opened', self.uniqueId);
        if (self.openedEvent) self.$bus.$emit(self.openedEvent, self.uniqueId);
        if (self.openedCallback) self.openedCallback();

        setTimeout(() => {
          self.$refs.content.focus();
        }, 200);
      }

      if (self.focusTarget) {
        const target = self.$el.querySelector(self.focusTarget);
        if (target) target.focus();
      }
    },

    close(clearHash = true) {
      if (this.active) {
        this.$bus.$emit('modal-closing', this.uniqueId);
        document.documentElement.classList.remove('belk-drawer-open');
        this.active = false;
        this.$bus.$emit('modal-closed', this.uniqueId);
        if (this.closedEvent) this.$bus.$emit(this.closedEvent, this.uniqueId);
        if (this.closedCallback) this.closedCallback();
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
      const toggleTriggers = '[toggle-trigger]';
      self.toggleTriggers = self.$el.querySelectorAll(toggleTriggers);
      for (let y = 0; y < self.toggleTriggers.length; y += 1) {
        const el = self.toggleTriggers[y];
        el.addEventListener('click', self.toggle);
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
          self.$bus.$emit('close-modals');
        });
      }
    },

    createContainer() {
      const self = this;
      const container = document.createElement('div');
      container.id = 'belk-drawers';
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
      const exists = document.querySelector(`#belk-drawers #${id}`);
      if (exists) exists.remove();
      setTimeout(() => {
        self.container.appendChild(self.$el);
      });
    },
  },
};
</script>

<style lang="scss" src="../style/default.scss"></style>
<style lang="scss">

  #belk-drawers {
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
    // transition: opacity 150ms ease;
    *:focus {
      outline: 2px solid $accent-tertiary;
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

  #belk-drawers {
    opacity: 1;
    max-height: 100vh;
    background: none;
    z-index: 89;
  }

  html {
    &.belk-drawer-open {
      > * {
        overflow: hidden !important;
      }

      #belk-drawers {
        opacity: 1;
        pointer-events: initial;
        max-height: initial;
        overflow-y: auto;
        belk-drawer-buttons {
          display: block;
        }
      }
    }
  }
</style>
