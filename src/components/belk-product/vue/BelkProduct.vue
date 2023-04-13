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

        <belk-price
          vce-cloak
          :price="content.price"
          :price_range="[content.price_range]"
          :sale_price="content.sale_price"
          :sale_price_range="[content.sale_price_range]"
          :discount_type="content.discountType"
          :coupon="content.coupon"></belk-price>
            </div>
          </a>
        </template>
        <div v-if="qty">
          <span>{{ size }}</span><span v-if="color">,&nbsp;</span><span>{{ color }}</span>
        </div>
        <div v-if="qty">Qty: {{ qty }}</div>
        <div class="product-price b-t margin-t-micro pad-t-micro">
        <belk-price
          vce-cloak
          v-if="['add'].includes(this.variant)"
          show-percent
          :price="content.price"
          :price_range="[content.price_range]"
          :sale_price="content.sale_price"
          :sale_price_range="[content.sale_price_range]"
          :discount_type="content.discountType"
          :coupon="content.coupon"></belk-price>
        </div>
        <div class="rating" v-if="rating">
          <sh-rating vce-cloak :level="rating"></sh-rating>
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
          <div v-if="content.colors">
            <!-- <belk-swatch :data='content.colors'></belk-swatch> -->
            <component :is="belkSwatch" :items="content.colors"></component>
          </div>
          <div v-if="content.sizes" class="product-size">
            <div class="add-label">Size:</div>
            <div class="flex start wrap radio-select">
              <div v-for="(size, index) in content.sizes" :key="size" class="radio">
                <input :id="`size-${size.slugify()}`"
                  type="radio"
                  hidden
                  name="product-size"
                  :value="size"
                  :checked="(index === 0)">
                <label tabindex="0" :for="`size-${size.slugify()}`">{{ size }}</label>
              </div>
            </div>
          </div>
          <div class="product-qty">
            <div class="add-label">Quantity:</div>
            <div class="flex start">
            <button :disabled="itemQty == 1" @click="(itemQty > 1) ? itemQty -= 1 : ''">
              <i class="material-icons-round">remove</i>
            </button>
            <div class="qty-display">{{ itemQty }}</div>
            <!-- <input type="number" length="3" min="0" step="1" max="99" v-model="itemQty"> -->
            <button :disabled="itemQty >= itemMax" @click="itemQty += 1">
              <i class="material-icons-round">add</i>
            </button>
            </div>
          </div>
          <div>[ SPECIAL OFFERS ]</div>
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
          <div
            v-if="content.frequency"
            class="product-frequency">
            <div>Subscribe:</div>
            <sh-checkbox variant="primary"
              unique-id="freq"
              toggle-event="open-shipping-freq"
              label="Toggle shipping accordion"></sh-checkbox>
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
                      <div class="bold">{{ item.name }}</div>
                      <div v-if="index == 0" class="lowlight-tertiary">(Recommended)</div>
                    </div>
                  </div>
                </div>
              </sh-accordion>
          </div>
        </div>
      </div>

    <template v-if="variant != 'add'">
    </template>
  </div>
</template>

<script>
import MoneyFormatter from '../../money-formatter';
import ComponentPrototype from '../../component-prototype';
import BelkSwatch from '../../belk-swatch/vue/BelkSwatch.vue';
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
      belkSwatch: BelkSwatch,
      shAccordion: ShAccordion,
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
      return this.content.qty || 5;
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
  },

  methods: {
    events() {
      this.$bus.$on('clear-suggestions', this.clearSuggestions);
      this.$bus.$on('search-suggestions-loaded', this.processProps);
      if (this.uniqueId) {
        this.$bus.$on(`update-product-${this.uniqueId}`, this.updateContent);
        // this.$bus.$on('open-shipping-freq', () => {
        //   const input = this.$el.querySelector('#shipping-freq .active input');
        //   input.checked = true;
        // });
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
      this.loading = false;
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

    reset() {
      // scroll everything to original positions,
      const images = this.$el.querySelector('.images');
      if (images) images.scrollTop = 0;
      this.itemQty = 1;
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
