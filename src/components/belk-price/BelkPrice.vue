<template>
  <div class="belk-price"
    :variant="variant">
    <div class="original" v-bind:class="{ 'is-range': priceRange }">{{ originalPrice }}</div>
    <div class="actual" v-bind:class="{ 'is-range': saleRange }">{{ salePrice }}</div>
    <div v-if="coupon" class="coupon">after coupon</div>
  </div>
</template>

<script>
import ComponentPrototype from '../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkPrice',

  props: {
    dataPrice: {
      type: Object,
    },
  },

  data() {
    return {
      saleRange: false,
      priceRange: false,
      onSale: false,
      data: {},
      salePrice: null,
      originalPrice: null,
      coupon: false,
    };
  },

  watch: {
    data(val) {
      if (val.price_range.length > 1) {
        if (val.price_range[0] !== val.price_range[1]) {
          this.originalPrice = `${this.format(val.price_range[0])} - ${this.format(val.price_range[1])}`;
        }
      } else {
        this.originalPrice = this.format(this.price);
      }

      if (val.sale_price_range.length > 1) {
        if (val.sale_price_range[0] !== val.sale_price_range[1]) {
          this.salePrice = `${this.format(val.sale_price_range[0])} - ${this.format(val.sale_price_range[1])}`;
        }
      } else {
        this.salePrice = this.format(this.sale);
      }
    },
  },

  mounted() {
    this.setUUID();
    // eslint-disable-next-line
    console.log(this.uuid);
    // eslint-disable-next-line
    console.log(this.dataPrice);
    this.data = this.dataPrice;
  },

  methods: {
    format(price) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      });
      return formatter.format(price);
    },
  },
};


/*
brand: "BeBop"
pid: "1501241ZRB09443"
price: 32
price_range: [32, 32]
0: 32
1: 32
sale_price: 11.99
sale_price_range: [11.99, 11.99]
0: 11.99
1: 11.99
thumb_image: "https://belk.scene7.com/is/image/Belk?layer=0&src=1501241_ZRB09443_A_960_T10L00&layer=comp&&color_id=960337656961"
title: "Short Sleeve Button Front Shirt Dress"
url: "https://www.belk.com/p/bebop-short-sleeve-button-front-shirt-dress/1501241ZRB09443.html?_br_psugg_q=shirtdress"
*/
</script>

<style lang="scss" src="./style/default.scss"></style>
