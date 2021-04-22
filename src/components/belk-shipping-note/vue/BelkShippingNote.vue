<template>
  <div class="belk-shipping-note"
    :variant="variant" v-html="activemsg"></div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';
import MoneyFormatter from '../../money-formatter';

export default {
  mixins: [ComponentPrototype, MoneyFormatter],

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
      subTotal: 0,
    };
  },

  watch: {
    freeShipping(val) {
      // console.log('FREESHIPPING UPDATED', val);
      if (this.subTotal >= val) {
        this.activemsg = this.msg;
      } else {
        const spend = this.format(val - this.subTotal);
        this.activemsg = `Spend <span class="bold">${spend}</span> more to earn FREE Shipping`;
      }
    },
  },

  methods: {
    events() {
      this.$bus.$on('user-data', (data) => {
        this.subTotal = data.subTotal;
      });
      this.$bus.$on('free-shipping', (val) => {
        if (this.freeShipping) this.$set(this, 'freeShipping', val);
      });
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
