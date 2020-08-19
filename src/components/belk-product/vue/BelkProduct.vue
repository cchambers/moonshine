<template>
  <div class="belk-product"
    :variant="variant"
    v-bind:class=" { 'is-on-sale': onSale } ">
    <a :href="fixedUrl" :data-pid="pid">
      <div class="image" :style="{ backgroundImage: 'url('+thumb_image+')' }"></div>
      <div class="data">
        <div class="name">
          <div class="brand">{{ brand }}</div>
          <div class="title">{{ title }}</div>
        </div>
        <div class="price">
          <span v-if="onSale" class="sale"
          v-bind:class="{ 'is-range': saleRange }">{{ salePrice }} </span>
          <span class="original"
          v-bind:class="{ 'is-range': priceRange }">{{ originalPrice }}</span>
          <span v-if="coupon" class="coupon">after coupon</span>
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
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkProduct',

  props: {
    title: String,
    url: String,
    price: Number,
    pid: String,
    reviews: Array,
    brand: String,
    sale_price_range: Array,
    sale_price: Number,
    price_range: Array,
    thumb_image: String,
  },

  data() {
    return {
      saleRange: Array,
      priceRange: Array,
      onSale: false,
      salePrice: String,
      originalPrice: String,
      coupon: false,
      fixedUrl: String,
    };
  },

  methods: {
    events() {
      this.$bus.$on('search-suggestions-loaded', this.processProps);
    },

    quickView(e) {
      // make URL,
      this.$emit('open-modal', { id: 'modal-quickview', url: this.url });
      return e;
    },

    processProps() {
      const whref = window.location.href;
      const dev = (whref.indexOf('belk.demand') >= 0)
        || (whref.indexOf('belkdev') >= 0)
        || (whref.indexOf('localhost') >= 0);
      if (dev) {
        const newUrl = this.url.replace('https://www.belk.com', window.location.origin);
        this.fixedUrl = newUrl;
      } else {
        this.fixedUrl = this.url;
      }

      if (this.price_range.length > 1) {
        if (this.price_range[0] !== this.price_range[1]) {
          this.originalPrice = `${this.format(this.price_range[0])} - ${this.format(this.price_range[1])}`;
          this.priceRange = true;
        } else {
          this.originalPrice = this.format(this.price);
        }
      }

      if (this.sale_price_range.length > 1) {
        if (this.sale_price_range[0] !== this.sale_price_range[1]) {
          this.salePrice = `${this.format(this.sale_price_range[0])} - ${this.format(this.sale_price_range[1])}`;
          this.saleRange = true;
        } else {
          this.salePrice = this.format(this.sale_price_range[0]);
        }
      }

      if (this.originalPrice !== this.salePrice) this.onSale = true;
    },

    format(price) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      });
      return formatter.format(price);
    },
  },

  mounted() {
    this.processProps();
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>

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
