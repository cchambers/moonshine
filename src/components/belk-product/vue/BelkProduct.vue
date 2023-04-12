<template>
  <div class="belk-product"
    :variant="variant"
    v-bind:class=" { 'is-on-sale': onSale || discountType } ">
      <div v-if="content.images"
        class="images">
        <ul>
          <li v-for="src in content.images" :key="src">
            <div class="image"
              :style="`background-image:url('${src}');`"></div>
          </li>
        </ul>
      </div>
      <div class="product-data">
        <template v-if="['add'].includes(this.variant)"
          class="name">
          <div class="brand"><a href="#" class="lowlight-tertiary">{{ content.brand }}</a></div>
          <div class="title">{{ content.title }}</div>
        </template>
        <template v-if="['default', 'bag'].includes(this.variant)">
          <a class="product-link"
            :href="content.url"
            :data-pid="pid">
            <div class="image"
            :style="{ backgroundImage: 'url('+thumb_image+')' }"></div>
            <div class="data">
              <div class="name">
                <div class="brand">{{ content.brand }}</div>
                <div class="title">{{ content.title }}</div>
              </div>
              <div class="price">
                <span v-if="onSale || discountType" class="sale"
                :discount="discountType"
                v-bind:class="{ 'is-range': saleRange }">{{ saleValue }} </span>
                <span class="original"
                :discount="discountType"
                v-bind:class="{ 'is-range': priceRange }">{{ originalValue }} </span>
                <span v-if="coupon" class="coupon">after coupon</span>
              </div>
            </div>
          </a>
        </template>
        <div v-if="qty">
          <span>{{ size }}</span><span v-if="color">,&nbsp;</span><span>{{ color }}</span>
        </div>
        <div v-if="qty">Qty: {{ qty }}</div>
        <div v-if="['add'].includes(this.variant)"
          class="price">
          <span v-if="onSale || discountType" class="sale"
          :discount="discountType"
          v-bind:class="{ 'is-range': saleRange }">{{ saleValue }} </span>
          <span class="original"
          :discount="discountType"
          v-bind:class="{ 'is-range': priceRange }">{{ originalValue }} </span>
          <span v-if="coupon" class="coupon">after coupon</span>
        </div>
        <div class="rating" v-if="rating">
          <sh-rating :level="rating"></sh-rating>
        </div>
        <div class="extra-1"></div>
        <div class="extra-2"></div>
        <div class="extra-3"></div>
        <div class="extra-4"></div>
        <!-- <div class="quick-view">
          <sh-button v-hammer:tap="quickView">Quick View</sh-button>
        </div> -->
        <div v-if="['add'].includes(this.variant)"
          class="add-form">
          <div>SWATCHES</div>
          <div>SIZE</div>
          <div>QTY</div>
          <div>SPECIAL OFFER?</div>
          <sh-accordion variant="secondary"
            unique-id="product-add-protection">
            <div slot="header">
              Protection
            </div>
            <div slot="body">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur laborum aspernatur, tempore omnis, est ad animi.</p>
            </div>
          </sh-accordion>
          <sh-accordion variant="secondary"
            unique-id="product-add-install">
            <div slot="header">
              Installation
            </div>
            <div slot="body">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur laborum aspernatur, tempore omnis, est ad animi.</p>
            </div>
          </sh-accordion>
          <div>SHIPPING</div>
          <div>SUBSCRIPTION FREQ</div>
        </div>
      </div>

    <template v-if="variant != 'add'">
    </template>
  </div>
</template>

<script>
import MoneyFormatter from '../../money-formatter';
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype, MoneyFormatter],

  name: 'BelkProduct',

  props: {
    uniqueId: {
      type: String,
    },
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
      isOnSale: false,
      __placeholder__: null,
      content: {
        title: this.title,
        brand: this.brand,
        url: this.url,
        reviews: this.reviews,
      },
    };
  },

  computed: {
    rating() {
      let r;
      const { reviews } = this.content;
      if (typeof reviews === 'object') {
        [r] = reviews;
      }
      r = parseFloat(r);
      r = r.toFixed(1);
      r = parseFloat(r);
      return r;
    },

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
      if (this.url) this.content.url = this.url;
      if (this.price === 0) this.content.url = '#';
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
      this.content.url = val;
    },
  },

  methods: {
    events() {
      this.$bus.$on('clear-suggestions', this.clearSuggestions);
      this.$bus.$on('search-suggestions-loaded', this.processProps);
      if (this.uniqueId) this.$bus.$on(`update-product-${this.uniqueId}`, this.updateContent);
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
        isOnSale: false,
        content: {},
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
        this.$set(this.content, 'url', newUrl);
      } else {
        this.$set(this.content, 'url', this.url);
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
      this.content = { ...this.$props };
    },

    updateContent(data) {
      this.content = { ...data };
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/bag.scss"></style>
<style lang="scss" src="../style/add.scss"></style>

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
