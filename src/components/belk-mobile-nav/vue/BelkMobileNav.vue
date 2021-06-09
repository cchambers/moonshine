<template>
  <div class="belk-mobile-nav" role="dialog"
    :variant="variant"
    :id="uniqueId"
    :aria-labelledby="ariaID"
    :aria-describedby="ariaDescID"
    :class="{
      active: active
    }">
    <div class="overlay" @click="close"></div>
    <div class="container">
      <div class="tab-lock" v-if="active" v-on:focus="focusButton()" tabindex="0"></div>
      <button @click="close"
        type="button"
        ref="toggle"
        class="top flex back-highlight-secondary lowlight-primary bold pad-x-micro px-18 lh-50">
        Menu
        <belk-icon name="close" height="22" width="22"
          class="lowlight-quaternary">Close Menu</belk-icon>
      </button>
      <div class="scroll-y">
        <nav class="primary"
          :id="ariaDescID"
          ref="primaryNav">
          <slot name="primary"></slot>
        </nav>
        <nav class="secondary"
          ref="secondaryNav">
          <ul>
            <slot name="secondary"></slot>
          </ul>
        </nav>
        <div class="tab-lock" v-if="active" v-on:focus="focusButton()" tabindex="0"></div>
        <div hidden ref="in"><slot></slot></div>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkMobileNav',

  props: {
    uniqueId: {
      type: String,
      default: 'mobile-nav',
    },
  },

  data() {
    return {
      active: false,
      ariaID: String,
      ariaHeaderID: String,
      ariaDescID: String,
    };
  },

  mounted() {
    this.ariaID = `aria-${this.uniqueId}`;
    this.ariaHeaderID = `aria-header-${this.uniqueId}`;
    this.ariaDescID = `aria-desc-${this.uniqueId}`;
    const catID = window.sessionStorage.getItem('clicked-cat-cgid');

    if (catID !== null) {
      setTimeout(() => {
        this.auto(catID);
      });
    }

    this.$bus.$emit('update-fills');
  },

  methods: {
    events() {
      this.$bus.$on('show-mobile-nav', this.open);
      window.libs.notify.api.request(['show-mobile-nav'], this.open, false);
    },
    open() {
      if (!this.active) {
        document.documentElement.classList.add('scroll-block');
        this.active = true;
        this.$bus.$emit('modal-opened', this.uniqueId);
        setTimeout(() => {
          this.$refs.toggle.focus();
        }, 200);
      }
    },
    close() {
      if (this.active) {
        document.documentElement.classList.remove('scroll-block');
        this.active = false;
        this.$bus.$emit('modal-closed', this.uniqueId);
      }
    },
    auto(str) {
      const sel = `[data-cgid="${str}"], .belk-mobile-nav a[href$="/${str}/"]`;
      const target = document.querySelector(sel);
      if (target) {
        const item = target.closest('sh-accordion');
        if (item) {
          const slug = `open-${item.uniqueId.slugify()}`;
          window.sessionStorage.removeItem('clicked-cat-cgid');
          setTimeout(() => {
            this.$bus.$emit(slug);
          }, 1000);
        } else {
          this.log('no unique id for item');
        }
      }
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
