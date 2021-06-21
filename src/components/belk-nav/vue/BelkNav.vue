<template>
  <div class="belk-nav" :class="{ active: active }" @click="checkClose">
    <!-- <div class="spacer back-highlight-primary"></div> -->
    <div class="contain"
      v-on:keydown="keydownHandler">
      <div class="nav-categories">
        <!-- <div class="tab-lock" v-if="active" v-on:focus="focusLast()" tabindex="0"></div> -->
        <slot name="cats"></slot>
        <div class="tab-lock" v-if="active" v-on:focus="focusFirst()" tabindex="0"></div>
      </div>
      <div class="nav-actual">
        <slot name="navs"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkNav',

  mounted() {
    this.headerEl = document.querySelector('belk-header');
    this.cats = this.$el.querySelectorAll('[main]');
    this.cats.forEach((el) => {
      el.addEventListener('mouseover', () => {
        const cat = el.getAttribute('main');
        this.activate(cat, true);
      });
      el.addEventListener('focus', () => {
        const cat = el.getAttribute('main');
        this.activate(cat);
      });
      // eslint-disable-next-line
      el.tabIndex = 0;
    });

    setTimeout(() => {
      this.trigger = document.querySelector('[click-event="show-nav"] button');
    }, 20);
  },

  data() {
    return {
      active: false,
      headerEl: false,
      trigger: false,
      cats: [],
    };
  },

  watch: {
    active(val) {
      if (val) {
        this.headerEl.classList.add('nav-active');
        document.documentElement.classList.add('nav-open');
      } else {
        this.headerEl.classList.remove('nav-active');
        document.documentElement.classList.remove('nav-open');
      }
    },
  },

  methods: {
    events() {
      this.$bus.$on('show-nav', this.toggle);
      if (!this.checkDev()) window.libs.notify.api.request(['show-nav'], this.toggle, false);
      this.$bus.$on('popper-opening', () => {
        this.hide('popper');
      });
      document.addEventListener('click', (e) => {
        const contains = this.elementContains(this.$el, e.target);
        if ((!contains && e.target !== this.trigger) && this.active) this.hide('off click');
      });
    },

    toggle() {
      // this.$bus.$emit('show-curtain');
      this.active = !this.active;
    },

    hide() {
      if (this.active) this.active = false;
      this.reflow();
    },

    activate(which, focusContent = false) {
      this.catsOff();
      const el = this.$el.querySelector(`[category="${which}"]`);
      if (el) {
        el.classList.add('active');
        el.scrollTop = 0;
        if (focusContent) {
          const explore = el.querySelector('.explore');
          if (explore) explore.focus();
        }
      }
      const main = this.$el.querySelector(`[main="${which}"]`);
      if (main) main.classList.add('active');
    },

    catsOff() {
      const el = this.$el.querySelector('[category].active');
      if (el) el.classList.remove('active');
      const main = this.$el.querySelector('[main].active');
      if (main) main.classList.remove('active');
    },

    checkClose(e) {
      if (e.target === this.$el) this.trigger.click();
    },

    focusFirst() {
      this.cats[0].focus();
    },

    focusLast() {
      this.cats[this.cats.length - 1].focus();
    },

    keydownHandler(e) {
      const key = e.charCode || e.keyCode;
      if (key === 27) {
        this.hide('kd');
        if (this.trigger) this.trigger.focus();
      }
      if (key === 39) document.querySelector('[category].active a').focus();
      if (key === 37) document.querySelector('[main].active').focus();
      if (key === 38) { // up
        const prev = document.querySelector('[main].active').previousElementSibling;
        if (prev) prev.focus();
      }
      if (key === 40) { // down
        const next = document.querySelector('[main].active').nextElementSibling;
        if (next) next.focus();
      }
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
