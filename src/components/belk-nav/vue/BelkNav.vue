<template>
  <div class="belk-nav" :class="{ active: active }" @click="checkClose">
    <!-- <div class="spacer back-highlight-primary"></div> -->
    <div class="contain">
      <div class="nav-categories">
        <slot name="cats"></slot>
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
        console.log(cat);
        this.activate(cat);
      });
    });
  },

  data() {
    return {
      active: false,
      headerEl: false,
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
      this.$bus.$on('popper-opening', this.hide);
      this.$bus.$on('search-opening', this.hide);
    },

    toggle() {
      // this.$bus.$emit('show-curtain');
      this.active = !this.active;
    },

    hide() {
      if (this.active) this.active = false;
    },

    activate(which) {
      this.catsOff();
      const el = this.$el.querySelector(`[category="${which}"]`);
      if (el) {
        el.classList.add('active');
        el.scrollTop = 0;
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
      if (e.target === this.$el) this.hide();
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
