<template>
  <div class="belk-product"
    :variant="variant">
    <a :href="url" :data-pid="pid">
      <div class="image" :style="{ backgroundImage: 'url('+thumb_image+')' }"></div>
      <div class="data">
        <div class="name">
          <div class="brand">{{ brand }}</div>
          <div class="title">{{ title }}</div>
        </div>
        <div class="price" >
          <div class="original" v-bind:class="{ 'is-range': priceRange }">{{ originalPrice }}</div>
          <div class="actual" v-bind:class="{ 'is-range': saleRange }">{{ salePrice }}</div>
          <div v-if="coupon" class="coupon">after coupon</div>
        </div>
        <div class="rating"><sh-rating :level="reviews"></sh-rating></div>
        <div class="quick-view">
          <sh-button v-hammer:tap="quickView">Quick View</sh-button>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import ComponentPrototype from '../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkProduct',

  props: {
    productData: {
      type: Object,
    },
  },

  data() {
    return {
      dataActual: {},
      title: null,
      url: null,
      price: null,
      pid: null,
      reviews: null,
      brand: null,
      sale_price_range: null,
      sale_price: null,
      price_range: null,
      thumb_image: null,

      saleRange: false,
      priceRange: false,
      onSale: false,
      salePrice: null,
      originalPrice: null,
      coupon: false,
    };
  },

  watch: {
    dataActual(val) {
      console.log(val);
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

  methods: {
    quickView(e) {
      return e;
    },
  },

  mounted() {
    if (this.productData) this.dataActual = this.productData;
  },

};
</script>
<style lang="scss" src="./style/default.scss"></style>
<style lang="scss" src="./style/primary.scss"></style>


<!--
{
  "title": "PFG Long Sleeve Button Down Bahama Shirt",
  "url": "https://www.belk.com/p/columbia-pfg-long-sleeve-button-down-bahama-shirt/18015461396561.html?_br_psugg_q=shirts",
  "price": 44.99,
  "pid": "18015461396561",
  "reviews": ["4.8182"],
  "brand": "Columbia",
  "sale_price_range": [44.99, 44.99],
  "sale_price": 44.99,
  "price_range": [44.99, 44.99],
  "thumb_image": "https://belk.scene7.com/is/image/Belk?layer=0&src=1801546_1396561_A_100_T10L00&layer=comp&&color_id=100284626987"
}
-->
