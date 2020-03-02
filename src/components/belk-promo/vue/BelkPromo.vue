<template>
  <div class="belk-promo">
    <div v-if="data.brd > 0" class="rewards-dollars">
      You have ${{data.brd}} Belk Reward Dollars<span class="line-combinator"
      aria-hidden="true">&nbsp;+&nbsp;</span>
    </div>
    <div class="free-shipping" v-html="shipping"></div>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkPromo',

  props: {
    freeShipping: {
      type: String,
      default: '99',
    },
    freeShippingBasic: {
      type: String,
      default: '99',
    },
    freeShippingPremier: {
      type: String,
      default: '99',
    },
  },

  data() {
    return {
      data: {
        brd: null,
        brc: '',
      },
    };
  },

  computed: {
    shipping() {
      let string;
      let brd = this.data.brd || 0;
      brd = parseInt(brd, 10);
      let brc = this.data.brc || '';
      brc = brc.toLowerCase();
      const freeShipping = (parseInt(this.freeShipping, 10) === 0);
      const freeShippingBasic = (parseInt(this.freeShippingBasic, 10) === 0);
      const freeShippingPremier = (parseInt(this.freeShippingPremier, 10) === 0);

      switch (brc) {
        case 'elite':
          if (brd) {
            string = 'Elites get <span class="uppercase">Free</span> Shipping every day';
          } else {
            string = '<span class="uppercase">Free</span> Shipping for Elites';
          }
          break;

        case 'premier':
          if (freeShippingPremier) {
            string = '<span class="uppercase">Free</span> Shipping for Premiers!';
          } else {
            string = `<span class="uppercase">Free</span> Shipping @ $${this.freeShippingPremier}`;
          }
          break;

        case 'basic':
          if (freeShippingBasic) {
            string = '<span class="uppercase">Free</span> Shipping for all cardholders!';
          } else {
            string = `<span class="uppercase">Free</span> Shipping @ $${this.freeShippingBasic}`;
          }
          break;

        default:
          if (freeShipping) {
            string = '<span class="uppercase">Free</span> Shipping on all orders!';
          } else {
            string = `<span class="uppercase">Free</span> Shipping @ $${this.freeShipping}`;
          }
          break;
      }

      return string;
    },
  },

  mounted() {
    const self = this;
    self.setupEvents();
    setTimeout(() => {
      self.$bus.$emit('get-user-data');
    }, 200);
  },

  methods: {
    setupEvents() {
      this.$bus.$on('user-data', this.handleData);
    },

    handleData(data) {
      if (data.brd) this.$set(this.data, 'brd', data.brd);
      if (data.brc) this.$set(this.data, 'brc', data.brc);
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
