<template>
  <div class="belk-shipping-note"
    :variant="variant">
    {{ activemsg }}
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkShippingNote',

  props: {
    msg: {
      type: String,
      default: 'Congrats! You\'ve earned FREE Shipping.',
    },
    altmsg: {
      type: String,
      default: false,
    },
  },

  data() {
    return {
      activemsg: this.altmsg || this.msg,
    };
  },

  methods: {
    events() {
      this.$bus.$on('free-shipping', () => {
        this.freeShipping = true;
        this.activemsg = this.msg;
      });
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
