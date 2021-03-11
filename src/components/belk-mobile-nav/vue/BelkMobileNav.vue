<template>
  <div class="belk-mobile-nav" role="dialog"
    :variant="variant"
    :id="uniqueId"
    :aria-labelledby="ariaID"
    :aria-describedby="ariaDescID"
    :class="{
      active: active
    }">
    <div class="container">
      <div class="tab-lock" v-if="active" v-on:focus="focusButton()" tabindex="0"></div>
      <button v-hammer:tap="close"
        type="button"
        class="top flex back-highlight-secondary lowlight-primary bold pad-x-micro px-18 lh-50">
        Menu
        <belk-icon name="close" height="22" width="22"
          class="lowlight-tertiary">Close Menu</belk-icon>
      </button>
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
  },

  methods: {
    events() {
      this.$bus.$on('show-mobile-nav', this.open);
    },
    open() {
      if (!this.active) this.active = true;
    },
    close() {
      if (this.active) {
        document.documentElement.classList.remove('sh-modal-open');
        this.active = false;
        this.$bus.$emit('modal-closed', this.uniqueId);
      }
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
