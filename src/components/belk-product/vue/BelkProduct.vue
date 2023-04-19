<template>
  <div class="belk-product"
    :variant="variant"
    v-bind:class=" { 'is-on-sale': onSale || discountType } ">
    <div v-if="content.images"
      ref="images"
      class="images"
      :class="{ loading: loading }">
      <ul>
        <li v-for="src in content.images" :key="src">
          <div class="image"
            :style="{ backgroundImage: `url(${src})` }"></div>
        </li>
      </ul>
    </div>
    <div class="product-data">
      <template v-if="['add'].includes(this.variant)"
        class="product-name">
        <div class="product-brand">
          <a href="#" class="lowlight-tertiary">{{ content.brand }}</a>
        </div>
        <div class="product-title">{{ content.title }}</div>
      </template>
      <template v-if="['default', 'bag'].includes(this.variant)">
        <a class="link"
          :href="content.url"
          :data-pid="pid">
          <div class="image"
          :style="{ backgroundImage: `url(${thumb_image})` }"></div>
          <div class="data">
            <div class="name">
              <div class="brand">{{ content.brand }}</div>
              <div class="title">{{ content.title }}</div>
            </div>
            <div v-if="qty">
              <span>{{ size }}</span><span v-if="color">,&nbsp;</span><span>{{ color }}</span>
            </div>
            <div v-if="qty">Qty: {{ qty }}</div>
            <component :is="belkPrice"
              :price="content.price"
              :price_range="[content.price_range]"
              :sale_price="content.sale_price"
              :sale_price_range="[content.sale_price_range]"
              :discount_type="content.discountType"
              :coupon="content.coupon"></component>
          </div>
        </a>
      </template>
      <div v-if="['add'].includes(this.variant)"
        class="product-price">
        <component :is="belkPrice"
          show-percent
          variant="add"
          :price="content.price"
          :price_range="[content.price_range]"
          :sale_price="content.sale_price"
          :sale_price_range="[content.sale_price_range]"
          :discount_type="content.discountType"
          :coupon="content.coupon"></component>
        </div>
      <div class="product-rating flex" v-if="rating">
        <sh-rating vce-cloak :level="rating" count="16"></sh-rating>
        <a
          class="accent-primary flex-inline pad-l-micro margin-r-auto px-15"
          href="#">Write a Review</a>
      </div>
      <div class="extra-1"></div>
      <div class="extra-2"></div>
      <div class="extra-3"></div>
      <div class="extra-4"></div>
      <!-- <div class="quick-views">
        <sh-button v-hammer:tap="quickView">Quick View</sh-button>
      </div> -->
      <div v-if="['add'].includes(this.variant)"
        class="add-form">
        <div v-if="content.colors"
          class="product-colors">
          <!-- <belk-swatch :data='content.colors'></belk-swatch> -->
          <component :is="belkSwatch" :data="content.colors"></component>
          <sh-button
            variant="tertiary"
            class="lowlight-tertiary margin-l-auto"
            scale="50"
            @click="launchColorModal">view all {{ content.colors.length }} colors</sh-button>
        </div>
        <div v-if="content.sizes"
          class="product-size">
          <div class="add-label">Size:</div>
          <ul class="flex start pad-b-little"
            role="listbox">
            <li v-for="(size, index) in content.sizes"
            :key="size"
            @click="activateSize(index)"
            @keypress.space.prevent="activateSize(index)"
            tabindex="0"
            role="option"
            :aria-selected="size == activeSize"
            :class="{ active: size == activeSize }">
              {{ size }}
            </li>
          </ul>
          <sh-button
            variant="tertiary"
            class="lowlight-tertiary margin-l-auto"
            scale="50"
            @click="launchSizeModal">view all {{ content.sizes.length }} sizes</sh-button>
          </div>
        </div>
        <div class="product-qty">
          <div class="add-label">Quantity:</div>
          <div class="flex start">
            <button :disabled="itemQty == 1"
              @mousedown="startDecrement"
              @mouseleave="stopInterval"
              @mouseup="stopInterval"
              @keypress.space.prevent="decrement">
              <i class="material-icons-round">remove</i>
            </button>
            <div class="qty-display">{{ itemQty }}</div>
            <!-- <input type="number" length="3" min="0" step="1" max="99" v-model="itemQty"> -->
            <button :disabled="itemQty >= itemMax"
                @mousedown="startIncrement"
                @mouseleave="stopInterval"
                @mouseup="stopInterval"
                @keypress.space.prevent="increment">
              <i class="material-icons-round">add</i>
            </button>
            <!-- <div v-if="qtyError" class="state-error">Nah.</div> -->
          </div>
        </div>
        <div v-if="content.promotions && !loading"
          class="product-promotions">
          <component :is="belkOfferLinks"
            unique-id="product-detail-promotions"
            :data="content.promotions"
            :key="content.pid">
          </component>
        </div>
        <div v-if="content.conns">
          <sh-accordion variant="secondary"
            open-icon="expand_more"
            close-icon="expand_less"
            icon-color="lowlight-tertiary"
            icon-size="px-32"
            unique-id="product-add-protection">
            <div class="bold" slot="header">
              Protection
            </div>
            <div slot="body">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur laborum aspernatur, tempore omnis, est ad animi.</p>
            </div>
          </sh-accordion>
          <spacer-little class="b-t margin-t-little"></spacer-little>
          <sh-accordion variant="secondary"
            open-icon="expand_more"
            close-icon="expand_less"
            icon-color="lowlight-tertiary"
            icon-size="px-32"
            unique-id="product-add-install">
            <div class="bold" slot="header">
              Installation
            </div>
            <div slot="body">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur laborum aspernatur, tempore omnis, est ad animi.</p>
            </div>
          </sh-accordion>
          <spacer-little class="b-t margin-t-little"></spacer-little>
        </div>
        <div
          v-if="content.frequency && !loading"
          class="product-frequency">
          <sh-checkbox variant="primary"
            unique-id="freq"
            align="right"
            toggle-event="open-shipping-freq"
            label="Auto-Replenish"></sh-checkbox>
          <div class="px-12 lowlight-tertiary pad-t-little">
            Choose your frequency to opt-in to Auto-Replenish
            and save 15% on your upcoming shipment, and 20% off
            your 3rd shipment. <a href="#">Learn more.</a>
          </div>
          <sh-accordion
            unique-id="shipping-freq"
            variant="none"
            @click="activateFrequency">
            <div slot="body">
              <div ref="frequency"
                class="frequency-scroll">
                <div
                  v-for="(item, index) in content.frequency"
                  :key="item.value"
                  tabindex="0"
                  role="option"
                  class="frequency-select"
                  :class="{ active: index == 0 }">
                  <!-- <input type="radio"
                    name="frequency"
                    :value="item.value"> -->
                  <div class="bold px-14 ws-nowrap">{{ item.name }}</div>
                  <div v-if="index == 0" class="lowlight-tertiary px-13">(Recommended)</div>
                </div>
              </div>
            </div>
          </sh-accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MoneyFormatter from '../../money-formatter';
import ComponentPrototype from '../../component-prototype';
import BelkSwatch from '../../belk-swatch/vue/BelkSwatch.vue';
import BelkPrice from '../../belk-price/vue/BelkPrice.vue';
import BelkOfferLinks from '../../belk-offer-links/vue/BelkOfferLinks.vue';
import ShAccordion from '../../sh-accordion/vue/Accordion.vue';

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
      loading: false,
      __placeholder__: null,
      content: {
        title: this.title,
        brand: this.brand,
        url: this.url,
        reviews: this.reviews,
      },
      itemQty: 1,
      activeSize: null,
      activeColor: 1,
      belkSwatch: BelkSwatch,
      belkPrice: BelkPrice,
      belkOfferLinks: BelkOfferLinks,
      shAccordion: ShAccordion,
      interval: 1,
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

    itemMax() {
      return this.content.qty || 24;
    },

    originalValue() {
      const val = this.priceRange || this.format(this.price, 'originalValue BelkProduct');
      return val;
    },

    saleValue() {
      if (!this.salePrice && this.variant === 'bag') { // fixes weird bag/search data thing
        if (this.sale_price) this.salePrice = this.sale_price;
      }
      const val = this.saleRange || this.format(this.salePrice, 'saleValue BelkProduct');
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
    // window.addEventListener('popstate', (event) => {
    //   console.log('POP', event);
    // });
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

    itemQty(newVal) {
      this.$bus.$emit('product-quantity-update', newVal);
    },
  },

  methods: {
    events() {
      this.$bus.$on('clear-suggestions', this.clearSuggestions);
      this.$bus.$on('search-suggestions-loaded', this.processProps);
      if (this.uniqueId) {
        this.$bus.$on(`update-product-${this.uniqueId}`, this.updateContent);
      }
      if (['add'].includes(this.variant)) {
        // this.$bus.$on('modal-affirmed', this.handleModalAffirmed);
        // this.$bus.$on('modal-selected-pdp-color', this.handleColorUpdate);
        // this.$bus.$on('modal-selected-size-color', this.handleSizeUpdate);
        this.$bus.$on('modal-options-updated', this.handleOptionsUpdate);
      }
    },

    handleOptionsUpdate(data) {
      console.log(data);
    },

    handleModalAffirmed(e) {
      if (e === 'pdp-color') {
        this.$bus.$emit('get-selected-pdp-color');
      }
      if (e === 'pdp-size') {
        this.$bus.$emit('get-selected-pdp-size');
      }
    },

    checkChecked(val) {
      const ok = (val === 0) ? 'checked' : false;
      return ok;
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
      this.loading = true;
      this.content = { ...data };
      this.$bus.$emit('product-content-update');
      this.reset();
      // let lol = data.url.split('.com');
      // lol = `http://localhost:8080/demo/product${lol[1]}`;
      // if ('pushState' in window.history) {
      //   // if (!this.noState) {
      //   window.history.pushState({ test: 'ok' }, document.title, lol);
      //   // } else {
      //   //   window.history.replaceState({ test: 'ok' }, document.title, lol);
      //   // }
      // }
      setTimeout(() => { this.loading = false; });
    },

    activateFrequency(e) {
      const target = e.srcElement;
      if (!target.classList.contains('frequency-select')) return;
      const active = this.$el.querySelector('.frequency-select.active');
      if (active && active !== target) {
        active.classList.remove('active');
      }
      target.classList.add('active');
      // target.querySelector('input').checked = true;
    },

    activateSize(e) {
      this.activeSize = this.content.sizes[e];
    },

    increment() {
      if (this.itemQty < this.itemMax) this.itemQty += 1;
    },

    decrement() {
      if (this.itemQty > 1) this.itemQty -= 1;
    },

    startIncrement() {
      this.increment();
      this.interval = setInterval(() => {
        if (this.itemQty >= this.itemMax) {
          this.stopInterval();
        } else {
          this.increment();
        }
      }, 200);
    },

    startDecrement() {
      this.decrement();
      this.interval = setInterval(() => {
        if (this.itemQty <= 1) {
          this.stopInterval();
        } else {
          this.decrement();
        }
      }, 200);
    },

    stopInterval() {
      setTimeout(() => {
        clearInterval(this.interval);
      });
    },

    reset() {
      // scroll everything to original positions,
      const images = this.$el.querySelector('.images');
      if (images) images.scrollTop = 0;
      this.itemQty = 1;
      this.$bus.$emit('reset-checkbox-freq');
    },

    launchSizeModal() {
      this.$bus.$emit('modal-options-size', this.content.sizes);
      this.$bus.$emit('show-size-modal');
    },

    launchColorModal() {
      this.$bus.$emit('modal-options-color', this.content.colors);
      this.$bus.$emit('show-color-modal');
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
