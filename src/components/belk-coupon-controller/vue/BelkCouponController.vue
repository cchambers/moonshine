<template>
  <div class="belk-coupon-controller"
    :variant="variant">
    <slot></slot>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkCouponController',

  props: {
    msg: {
      type: String,
      default: 'new component',
    },
  },

  data() {
    return {
      snapping: false,
    };
  },

  methods: {
    events() {
      this.log('coupon controller loaded');
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
