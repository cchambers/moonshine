<template>
  <div class="belk-drawer" role="dialog"
    :class="{ active: active }"
    :reveal="reveal"
    :drawer="drawer"
    :id="uniqueId"
    :offscreen="!isReady"
    :attract="attractMode"
    :scrolling="scrolling"
    :aria-labelledby="ariaID"
    :aria-describedby="ariaDescID">
    <div class="tab-lock" v-if="active" v-on:focus="focusButton()" tabindex="0"></div>
    <div class="content" ref="content" @mouseover="mouseOverHandler">
      <div tabindex="0"
        v-hammer:tap="toggle"
        v-on:keydown.enter="toggle"
        v-on:keydown.space="toggle"
        v-on:keydown.tab="toggleTabHandler"
        ref="button"
        role="button"
        class="drawer-toggle flex align-top"
        :id="ariaID">
        <div v-if="!active">
          <div class="dt-headline">{{ buttonHeadlineInactive }}</div>
          <div class="dt-subhead">{{ buttonSubheadInactive }}</div>
        </div>
        <div v-else>
          <div class="dt-headline">{{ buttonHeadlineActive }}</div>
          <div class="dt-subhead">{{ itemCount }}{{ buttonSubheadActive }}</div>
        </div>
        <div class="dt-icon">
          <belk-icon name="arrow-up" width="16" height="20"></belk-icon>
        </div>
      </div>
      <div class="body"
        :id="ariaDescID"
        ref="body">
        <button aria-controls="promo-offers"
          v-if="scrolling" class="arrow previous"
          :disabled="scrollPrevDisabled" v-hammer:tap="previousHandler">
          <belk-icon width="10" name="arrow-left"></belk-icon>
        </button>
        <offer-container variant="promos" unique-id="promo-offers"></offer-container>
        <button aria-controls="promo-offers"
          v-if="scrolling" class="arrow next"
          :disabled="scrollNextDisabled" v-hammer:tap="nextHandler">
          <belk-icon width="10" name="arrow-right"></belk-icon>
        </button>
      </div>
      <div class="tab-lock" v-if="active" v-on:focus="focusButton()" tabindex="0"></div>
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
    showDelay: {
      type: Number,
      default: 1000,
    },
    attractDelay: {
      type: Number,
      default: 2000,
    },
    content: String,
    customClass: String,
    drawer: {
      type: String,
      default: 'bottom',
    },
    focusTarget: String,
    header: String,
    footer: String,
    reveal: String,
    variant: String,
    overlay: String,
    startOpen: Boolean,
    scrollSpeed: {
      type: Number,
      default: 3,
    },
    buttonHeadlineActive: String,
    buttonHeadlineInactive: String,
    buttonSubheadActive: String,
    buttonSubheadInactive: String,
  },

  data() {
    return {
      isReady: false,
      attractMode: false,
      attractTimeout: 0,
      triggers: [],
      triggerLinks: [],
      items: [],
      closeTriggers: [],
      hideControls: true,
      active: false,
      blockHistory: false,
      ariaID: String,
      ariaHeaderID: String,
      ariaDescID: String,
      links: Array,
      scrolling: false,
      scrollPrevDisabled: true,
      scrollNextDisabled: false,
      iecheck: false,
      iecheckran: false,
    };
  },

  computed: {
    itemCount() {
      return (this.items) ? this.items.length : 0;
    },

    tabindex() {
      return (this.active) ? '0' : '-1';
    },
  },

  watch: {
    active(val) {
      if (val) {
        if (this.attractMode) this.attractMode = false;
      }
    },

    attractMode(val) {
      if (!val) clearTimeout(this.attractTimeout);
    },

    items(val) {
      const width = val.length * 280;
      const wider = (width > window.innerWidth);
      if (wider) {
        this.scrolling = true;
      } else {
        this.scrolling = false;
      }
      setTimeout(() => {
        this.$bus.$emit('update-items-promo-offers', { which: 'promo-offers', data: val });
      }, 0);
    },
  },

  created() {
    this.iecheck = !(window.ActiveXObject) && 'ActiveXObject' in window;
  },

  mounted() {
    const self = this;
    if (typeof window.pageData === 'object') {
      const { offers } = window.pageData;
      if (offers) {
        let startWith = JSON.parse(JSON.stringify([...offers]));
        startWith = startWith.filter((item) => (item.promos));
        this.setItems(startWith);
      }
    }
    self.ariaID = `aria-${self.uniqueId}`;
    self.ariaHeaderID = `aria-header-${self.uniqueId}`;
    self.ariaDescID = `aria-desc-${self.uniqueId}`;
    self.links = self.$el.querySelectorAll('a, input, button, [tabindex]:not(.tab-lock), [close-trigger]');
    if (this.customClass) this.$refs.content.classList.add(this.customClass);
    if (window.location.hash) {
      self.hashHandler({
        hash: window.location.hash.substr(1),
        event: false,
      });
    }
    if (self.startOpen) {
      self.open();
    }
    setTimeout(() => {
      this.isReady = true;
    }, this.showDelay);
  },

  methods: {
    enableWatchEvents() {
      window.addEventListener('scroll', this.watchedEventHandler, true);
      window.addEventListener('touchmove', this.watchedEventHandler, true);
      window.addEventListener('click', this.watchedEventHandler);
    },

    disableWatchEvents() {
      window.removeEventListener('scroll', this.watchedEventHandler, true);
      window.removeEventListener('touchmove', this.watchedEventHandler, true);
      window.removeEventListener('click', this.watchedEventHandler);
    },

    watchedEventHandler(e) {
      if (this.elementContains(this.$el, e.target)) return;
      this.close(true, 'WATCHED');
    },

    doPrint() {
      window.print();
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
      this.$refs.button.focus();
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

      // self.$bus.$on('close-modals', () => {
      //   if (this.active) this.close();
      // });

      self.$bus.$on('modal-opening', () => {
        self.close(false, 'modal-opening');
      });

      self.$bus.$on('open-modal', (data) => {
        if (data.id === this.uniqueId) this.open();
      });

      window.addEventListener('keyup', (e) => {
        const key = e.keyCode;
        if (key === 27) self.$bus.$emit('close-modals'); // esc
      });

      self.$bus.$on('hashchange', this.hashHandler);

      self.$bus.$on('drawer-toggle', self.toggle);
      self.$bus.$on('drawer-open', self.open);
      self.$bus.$on('drawer-close', () => {
        self.close(true, 'drawer-close');
      });

      self.$bus.$on('drawer-add', self.addItemHandler);
      self.$bus.$on('drawer-move', self.moveItemHandler);
      self.$bus.$on('drawer-modify', self.modifyItemHandler);
      self.$bus.$on('drawer-remove', self.removeItemHandler);
      self.$bus.$on('drawer-replace', self.updateItemsHandler);
      self.$bus.$on('drawer-attract', self.attractHandler);

      let scrollTimeout;
      self.$refs.body.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(self.scrollHandler, 20);
      });
    },

    maxScroll() {
      const el = this.$refs.body;
      return el.scrollWidth - el.clientWidth;
    },

    scrollHandler() {
      const el = this.$refs.body;
      if (el.scrollLeft >= this.maxScroll()) {
        this.scrollNextDisabled = true;
      } else {
        this.scrollNextDisabled = false;
      }
      if (el.scrollLeft === 0) {
        this.scrollPrevDisabled = true;
      } else {
        this.scrollPrevDisabled = false;
      }
    },

    addItemHandler(event) {
      const items = event.data.what;
      const where = event.data.where || this.items.length;
      const isArray = Array.isArray(items);
      if (isArray) {
        const arr = [...items];
        arr.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.inDrawer = true;
        });
        this.items.splice(where, 0, ...arr);
      } else {
        items.inDrawer = true;
        this.items.splice(where, 0, items);
      }
      setTimeout(this.scrollHandler);
    },

    removeItemHandler(event) {
      const index = event.data.which;
      if (this.items[index]) {
        this.items.splice(index, 1);
      }
    },

    moveItemHandler(event) {
      const { from, to } = event.data;
      if (!this.items[to]) return;
      if (!this.items[from]) return;
      const arr = [...this.items];
      const it = arr.splice(from, 1)[0];
      arr.splice(to, 0, it);
      this.setItems(arr);
    },

    modifyItemHandler(event) {
      const { which, what } = event.data;
      const item = this.items[which];
      if (!item || !what) return;
      Object.keys(what).forEach((thing) => {
        this.$set(this.items[which], thing, what[thing]);
      });
    },

    updateItemsHandler(event) {
      const { data } = event;
      this.setItems(data);
    },

    attractHandler() {
      if (this.active) return;
      this.attractMode = true;
      this.attractTimeout = setTimeout(() => {
        this.attractMode = false;
      }, this.attractDelay);
    },

    mouseOverHandler() {
      if (this.attractMode) this.open();
    },

    setItems(data) {
      data.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.inDrawer = true;
      });
      setTimeout(() => {
        this.$set(this, 'items', data);
        this.$forceUpdate();
      }, 100);
    },

    hashHandler(data) {
      const { hash, event } = data;
      if (hash === '') {
        if (this.active) this.close(false, 'hashHandler');
      } else if (hash === this.uniqueId) {
        if (event) event.preventDefault();
        this.open();
      }
    },

    toggle(e) {
      if (e) e.srcEvent.stopPropagation();
      if (this.active) {
        this.close(true, 'toggle');
      } else {
        this.open();
      }
    },

    toggleTabHandler() {
      if (!this.active) {
        const target = document.querySelector('a, input, button, [tabindex]:not(.tab-lock), [close-trigger]');
        if (target) target.focus();
      }
    },

    open() {
      const self = this;
      if (this.iecheck && !this.iecheckran) {
        this.$bus.$emit('ie11');
        this.iecheckran = true;
      }
      if (!self.active) {
        self.$bus.$emit('modal-opening', self.uniqueId);
        document.documentElement.classList.add('belk-drawer-open');
        self.active = true;
        self.$bus.$emit('modal-opened', self.uniqueId);
        self.scrollHandler();
        setTimeout(() => {
          self.$refs.content.focus();
          self.enableWatchEvents();
          self.scrollHandler();
        }, 200);
      }

      if (self.focusTarget) {
        const target = self.$el.querySelector(self.focusTarget);
        if (target) target.focus();
      }
    },

    close(clearHash = true, from) {
      if (from && window.modalDebug) this.log(`drawer close from: ${from}`);
      const self = this;
      if (self.active) {
        self.$bus.$emit('drawer-closing', self.uniqueId);
        document.documentElement.classList.remove('belk-drawer-open');
        self.active = false;
        self.$bus.$emit('drawer-closed', self.uniqueId);
        self.disableWatchEvents();
      }
      if (self.attractMode) self.attractMode = false;
      if (clearHash) self.clearHash();
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

    configureTriggers() {
      const self = this;
      const selector = `[modal-trigger="${self.uniqueId}"]`;
      self.triggers = document.querySelectorAll(selector);
      for (let x = 0, l = self.triggers.length; x < l; x += 1) {
        const el = self.triggers[x];
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.hash = `#${self.uniqueId}`;
        });
      }

      // external toggle triggers
      const toggleTriggers = '[toggle-trigger]';
      self.toggleTriggers = document.querySelectorAll(toggleTriggers);
      for (let y = 0; y < self.toggleTriggers.length; y += 1) {
        const el = self.toggleTriggers[y];
        el.addEventListener('click', self.toggle);
      }
    },

    focus() {
      const activeSlide = this.$el.querySelector('.active');
      if (activeSlide) activeSlide.focus();
    },

    nextHandler() {
      const el = this.$refs.body;
      let dist = el.scrollLeft + el.offsetWidth / this.scrollSpeed;
      const max = this.maxScroll();
      if (dist > (max)) dist = max;
      el.scrollLeft = dist;
    },

    previousHandler() {
      const el = this.$refs.body;
      let dist = el.scrollLeft - el.offsetWidth / this.scrollSpeed;
      if (dist < 0) dist = 0;
      el.scrollLeft = dist;
    },
  },
};
</script>

<style lang="scss" src="../style/default.scss"></style>
<style lang="scss">

  #belk-drawer {
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

  #belk-drawer {
    opacity: 1;
    max-height: 100vh;
    background: none;
    z-index: 89;
  }

  html {
    &.belk-drawer-open {

      #belk-drawer {
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
