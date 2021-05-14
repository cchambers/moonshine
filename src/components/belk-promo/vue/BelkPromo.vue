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
    freeShippingStandard: {
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
      freeShipAt: Number,
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
      const freeShippingStandard = (parseInt(this.freeShippingStandard, 10) === 0);
      const freeShippingPremier = (parseInt(this.freeShippingPremier, 10) === 0);

      // WOW THOUGH
      if (brc === 'premiere') brc = 'premier';

      switch (brc) {
        case 'elite':
          if (brd) {
            string = '<span class="uppercase">Free</span> Shipping for Elites';
          } else {
            string = 'Elites get <span class="uppercase">Free</span> Shipping every day';
          }
          this.setData(0);
          break;

        case 'premier':
          if (freeShippingPremier) {
            string = '<span class="uppercase">Free</span> Shipping for Premiers!';
          } else {
            string = `<span class="uppercase">Free</span> Shipping @ $${this.freeShippingPremier}`;
          }
          this.setData(this.freeShippingPremier);
          break;

        case 'standard':
          if (freeShippingStandard) {
            string = '<span class="uppercase">Free</span> Shipping for all cardholders!';
          } else {
            string = `<span class="uppercase">Free</span> Shipping @ $${this.freeShippingStandard}`;
          }
          this.setData(this.freeShippingStandard);
          break;

        default:
          if (freeShipping) {
            string = '<span class="uppercase">Free</span> Shipping on all orders!';
          } else {
            string = `<span class="uppercase">Free</span> Shipping @ $${this.freeShipping}`;
          }
          this.setData(this.freeShipping);
          break;
      }

      return string;
    },
  },

  mounted() {
    setTimeout(() => {
      this.$bus.$emit('get-user-data', this);
      this.setPromoWidth();
    }, 200);
  },

  methods: {
    events() {
      this.$bus.$on('belk-bag-ready', this.emitData);
      this.$bus.$on('user-data', this.handleData);
    },

    setPromoWidth() {
      const math = (this.$el.clientWidth + 32) / 10;
      document.documentElement.style.setProperty('--promo-width', `${math}rem`);
    },

    handleData(data) {
      if (data.brd) this.$set(this.data, 'brd', data.brd);
      if (data.brc) this.$set(this.data, 'brc', data.brc);
      this.setPromoWidth();
    },

    setData(num) {
      this.freeShipAt = num;
    },

    emitData() {
      setTimeout(() => {
        this.$bus.$emit('free-shipping', this.freeShipAt);
      });
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
