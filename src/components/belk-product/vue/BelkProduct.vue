<template>
  <div class="belk-product"
    :variant="variant"
    v-bind:class=" { 'is-on-sale': onSale || discountType } ">
    <a class="product-link" :href="fixedUrl" :data-pid="pid">
      <div class="image"
        :style="{ backgroundImage: 'url('+thumb_image+')' }"></div>
      <div class="data">
        <div class="name">
          <div class="brand">{{ brand }}</div>
          <div class="title">{{ title }}</div>
        </div>
        <div v-if="qty">
          <span>{{ size }}</span><span v-if="color">,&nbsp;</span><span>{{ color }}</span>
        </div>
        <div v-if="qty">Qty: {{ qty }}</div>
        <div class="price">
          <span v-if="onSale || discountType" class="sale"
          :discount="discountType"
          v-bind:class="{ 'is-range': saleRange }">{{ saleValue }} </span>
          <span class="original"
          :discount="discountType"
          v-bind:class="{ 'is-range': priceRange }">{{ originalValue }} </span>
          <span v-if="coupon" class="coupon">after coupon</span>
        </div>
        <div class="rating"><sh-rating :level="reviews"></sh-rating></div>
        <div class="quick-view">
          <sh-button @click="quickView">Quick View</sh-button>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import MoneyFormatter from '../../money-formatter';
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype, MoneyFormatter],

  name: 'BelkProduct',

  props: {
    title: {
      type: String,
    },
    url: {
      type: String,
    },
    price: {
      type: Number,
    },
    pid: {
      type: String,
    },
    reviews: Array,
    brand: {
      type: String,
    },
    qty: Number,
    sale_price_range: {
      type: Array,
      default: () => [],
    },
    sale_price: Number,
    price_range: {
      type: Array,
      default: () => [],
    },
    thumb_image: {
      type: String,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    discountType: String,
  },

  data() {
    return {
      priceActual: null,
      saleRange: null,
      salePrice: null,
      priceRange: null,
      coupon: false,
      fixedUrl: String,
      isOnSale: false,
    };
  },

  computed: {
    originalValue() {
      const val = this.priceRange || this.format(this.price);
      return val;
    },

    saleValue() {
      if (!this.salePrice && this.variant === 'bag') { // fixes weird bag/search data thing
        if (this.sale_price) this.salePrice = this.sale_price;
      }
      const val = this.saleRange || this.format(this.salePrice);
      return val;
    },

    onSale() {
      let onSale = false;
      if (this.salePrice) {
        if (this.price > this.salePrice) onSale = true;
      }
      if (this.isOnSale) onSale = true;
      return onSale;
    },
  },

  created() {
    if (this.variant === 'bag') {
      if (this.url) this.fixedUrl = this.url;
      if (this.price === 0) this.fixedUrl = '#';
    }
  },

  mounted() {
    this.processProps();
    setTimeout(() => {
      this.checkOnSale('mtd');
    });
  },

  // updated() {
  //   setTimeout(() => {
  //     this.checkOnSale('upd');
  //   });
  // },

  watch: {
    url(val) {
      this.fixedUrl = val;
    },
  },

  methods: {
    events() {
      this.$bus.$on('clear-suggestions', this.clearSuggestions);
      this.$bus.$on('search-suggestions-loaded', this.processProps);
    },

    checkOnSale() {
      this.isOnSale = ((this.price > this.sale_price) || (this.price > this.salePrice));
    },

    clearSuggestions() {
      Object.assign(this.$data, {
        priceActual: null,
        saleRange: null,
        salePrice: null,
        priceRange: null,
        coupon: false,
        fixedUrl: String,
        isOnSale: false,
      });
    },

    quickView(e) {
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
        this.$set(this, 'fixedUrl', newUrl);
      } else {
        this.$set(this, 'fixedUrl', this.url);
      }
    },

    processProps() {
      this.fixUrl();
      if (this.sale_price) {
        this.salePrice = parseFloat(this.sale_price);
      }

      if (this.price_range.length > 1) {
        if (this.price_range[0] !== this.price_range[1]) {
          this.priceRange = `${this.format(this.price_range[0])} - ${this.format(this.price_range[1])}`;
        }
      }
      if (this.sale_price_range.length > 1) {
        if (this.sale_price_range[0] !== this.sale_price_range[1]
          && this.sale_price_range !== this.price_range) {
          this.saleRange = `${this.format(this.sale_price_range[0])} - ${this.format(this.sale_price_range[1])}`;
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
