<template>
  <div
    class="belk-price"
    :variant="variant"
    v-bind:class=" { 'is-on-sale': onSale || discount_type } "
    v-if="ready"
  >
    <div class="price">
      <span
        v-if="onSale || discount_type"
        class="sale"
        :discount="discount_type"
        v-bind:class="{ 'is-range': saleRange }"
      >{{ saleValue }}</span>
      <span
        class="original"
        :discount="discount_type"
        v-bind:class="{ 'is-range': priceRange }"
      >{{ originalValue }}</span>
      <span v-if="coupon" class="coupon">after coupon</span>
<<<<<<< HEAD
      <span v-if="showPercent && onSale" class="percentage">({{ percentOff }}% off)</span>
=======
      <span
        v-if="showPercent && onSale"
        class="percentage"
        >({{ percentOff }}% off)</span>
>>>>>>> 5cce5c70405c5b2104c29faceb3af8e237c7637c
    </div>
  </div>
</template>

<script>
import MoneyFormatter from '../../money-formatter';
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype, MoneyFormatter],

  name: 'BelkPrice',

  props: {
    uniqueId: String,
    data: null,
    price: [String, Number],
    sale_price_range: {
      type: Array,
      default: () => [],
    },
    sale_price: [String, Number],
    price_range: {
      type: Array,
      default: () => [],
    },
    discount_type: String,
    coupon: String,
    showPercent: Boolean,
    blink: false,
  },

  computed: {
    originalValue() {
      const val = this.priceRange || this.format(this.price, 'originalValue');
      return val;
    },

    saleValue() {
      if (!this.salePrice) {
        if (this.sale_price) this.$set(this, 'salePrice', this.sale_price);
      }
      const val = this.saleRange || this.format(this.salePrice, 'saleValue');
      return val;
    },

    percentOff() {
      const sale = this.salePrice;
      const original = this.price;
      let percent = 1 - (sale / original);
      percent = Math.round(percent * 100);
      return percent;
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

  data() {
    return {
      content: {},
      saleRange: null,
      salePrice: null,
      priceRange: null,
      isOnSale: false,
      ready: false,
    };
  },

  watch: {
    sale_price(newVal) {
      this.processProps(newVal);
    },
    sale_price_range(newVal) {
      this.processProps(newVal);
    },
    price_range(newVal) {
      this.processProps(newVal);
    },
  },

  mounted() {
    if (this.data) {
      this.ready = false;
      this.content = { ...this.data };
    }
    this.ready = true;
    this.processProps();
  },

  methods: {
    events() {
      this.$bus.$on('product-content-update', this.processProps);
      this.$bus.$on('search-suggestions-loaded', this.processProps);
      if (this.uniqueId) {
        this.$bus.$on(`trigger-update-${this.uniqueId}`, this.processProps);
        // this.$bus.$on(`update-${this.uniqueId}`, this.handleData);
      }
    },

    processProps() {
      this.ready = false;
      setTimeout(() => {
        if (this.sale_price) {
          this.salePrice = parseFloat(this.sale_price);
        }

        if (this.price_range.length > 1) {
          if (this.price_range[0] !== this.price_range[1]) {
            this.priceRange = `${this.format(
              this.price_range[0],
            )} - ${this.format(this.price_range[1])}`;
          }
        }
        if (this.sale_price_range.length > 1) {
          if (
            this.sale_price_range[0] !== this.sale_price_range[1]
            && this.sale_price_range !== this.price_range
          ) {
            this.saleRange = `${this.format(
              this.sale_price_range[0],
            )} - ${this.format(this.sale_price_range[1])}`;
          } else {
            this.salePrice = this.sale_price;
          }
        }
        this.ready = true;
      }, 5);
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
<style lang="scss" src="../style/add.scss"></style>
