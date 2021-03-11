<template>
  <div class="belk-mobile-nav" role="dialog"
    :variant="variant"
    :id="uniqueId"
    :aria-labelledby="ariaID"
    :aria-describedby="ariaDescID"
    :class="{
      active: active
    }">
    <div class="tab-lock" v-if="active" v-on:focus="focusButton()" tabindex="0"></div>
    <div v-hammer:tap="doClose" class="top flex">
      Menu <belk-icon name="cancel">Close Menu</belk-icon>
    </div>
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
    };
  },

  methods: {
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
