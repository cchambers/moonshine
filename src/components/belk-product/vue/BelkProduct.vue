<template>
  <div class="belk-product"
    :variant="variant"
    v-bind:class=" { 'is-on-sale': onSale || isOnSale } ">
    <div class="product-link" v-hammer:tap="handleTap" :data-pid="pid">
      <div class="image"
        :style="{ backgroundImage: 'url('+thumb_image+')' }"></div>
      <div class="data">
        <div class="name">
          <div class="brand">{{ brand }}</div>
          <div class="title">{{ title }}</div>
        </div>
        <div v-if="qty">Qty: {{ qty }}</div>
        <div v-if="qty">
          <span v-if="size != 'One Size'">{{ size }}</span>
          <span v-if="(size && color) && size != 'One Size' && color != 'No Color'">,&nbsp;</span>
          <span v-if="color != 'No Color'">{{ color }}</span>
          </div>
        <div class="price">
          <span v-if="onSale || isOnSale" class="sale"
          v-bind:class="{ 'is-range': saleRange.length > 0 }">{{ saleValue }} </span>
          <span class="original"
          v-bind:class="{ 'is-range': priceRange.length > 0 }">{{ originalValue }}</span>
          <span v-if="coupon" class="coupon">after coupon</span>
        </div>
        <div class="rating"><sh-rating :level="reviews"></sh-rating></div>
        <div class="quick-view">
          <sh-button v-hammer:tap="quickView">Quick View</sh-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MoneyFormatter from '../../money-formatter';
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype, MoneyFormatter],

  name: 'BelkProduct',

  props: {
    title: String,
    url: String,
    price: {
      type: Number,
    },
    pid: String,
    reviews: Array,
    brand: String,
    qty: Number,
    sale_price_range: {
      type: Array,
      default: [],
    },
    sale_price: Number,
    price_range: {
      type: Array,
      default: [],
    },
    thumb_image: String,
    size: String,
    color: String,
    salePrice: Number,
    originalPrice: Number,
  },

  data() {
    return {
      saleRange: [],
      priceRange: [],
      coupon: false,
      fixedUrl: String,
      isOnSale: false,
    };
  },

  computed: {
    originalValue() {
      if (!this.originalPrice) this.originalPrice = this.price;
      return (Number.isNaN(this.originalPrice))
        ? this.originalPrice : this.format(this.originalPrice);
    },

    saleValue() {
      if (!this.salePrice) this.salePrice = this.sale_price;
      return (Number.isNaN(this.salePrice))
        ? this.salePrice : this.format(this.salePrice);
    },

    onSale() {
      return (this.originalPrice > this.salePrice);
    },
  },

  mounted() {
    if (this.variant !== 'bag') {
      this.processProps();
    } else {
      this.fixUrl();
    }

    setTimeout(() => {
      this.isOnSale = (this.originalPrice > this.salePrice);
    });
  },

  methods: {
    events() {
      this.$bus.$on('search-suggestions-loaded', this.processProps);
    },

    handleTap() {
      this.log('pls');
      if (this.fixedUrl) window.location.href = this.fixedUrl;
      console.log(this.fixedUrl);
    },

    quickView(e) {
      // make URL,
      this.$emit('open-modal', { id: 'modal-quickview', url: this.url });
      return e;
    },

    fixUrl() {
      const whref = window.location.href;
      const dev = (whref.indexOf('belk.demand') >= 0)
        || (whref.indexOf('belkdev') >= 0)
        || (whref.indexOf('sandbox') >= 0);
      if (dev && this.url) {
        const newUrl = this.url.replace('https://www.belk.com', window.location.origin);
        this.fixedUrl = newUrl;
      } else {
        this.fixedUrl = this.url;
      }
    },

    processProps() {
      this.fixUrl();
      if (this.price) this.originalPrice = parseInt(this.price, 10);
      if (this.sale_price) this.salePrice = parseInt(this.sale_price, 10);
      if (this.price_range.length > 1) {
        if (this.price_range[0] !== this.price_range[1]) {
          this.originalPrice = `${this.format(this.price_range[0])} - ${this.format(this.price_range[1])}`;
          this.priceRange = true;
        } else {
          this.originalPrice = this.price;
        }
      }
      if (this.sale_price_range.length > 1) {
        if (this.sale_price_range[0] !== this.sale_price_range[1]) {
          this.salePrice = `${this.format(this.sale_price_range[0])} - ${this.format(this.sale_price_range[1])}`;
          this.saleRange = true;
        } else {
          this.salePrice = this.sale_price;
        }
      }
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/bag.scss"></style>

<!--
{
  "title": "PFG Long Sleeve Button Down Bahama Shirt",
  "url": "https://www.belk.com/p/columbia-pfg-long-sleeve-button-down-bahama-shirt/18015461396561.html?_br_psugg_q=shirts",
  "price": 44.99,
  "pid": "8015461396561",
  "reviews": ["4.8182"],
  "brand": "Columbia",
  "sale_price_range": [44.99, 44.99],
  "sale_price": 44.99,
  "price_range": [44.99, 44.99],
  "thumb_image": "https://belk.scene7.com/is/image/Belk?layer=0&src=1801546_1396561_A_100_T10L00&layer=comp&&color_id=100284626987"
}
-->
