<template>
  <div class="belk-products" :variant="variant">
    <ul>
      <li v-for="product in products" v-bind:key="product.index">
        <a :href="product.url">
          <div class="image" :style="{ backgroundImage: 'url('+product.thumb_image+')' }"></div>
          <div class="data">
            <div class="name">
              <div class="brand">{{ product.brand }}</div>
              <div class="title">{{ product.title }}</div>
            </div>
            <div class="price" is='belk-price'>{{product.price}}</div>
            <div class="rating"><sh-rating :level="product.reviews"></sh-rating></div>
            <div class="quick-view">
              <sh-button v-hammer:tap="quickView">Quick View</sh-button>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BelkProducts',
  props: {
    priceAPI: {
      type: String,
      default: 'https://www.belk.com/on/demandware.store/Sites-Belk-Site/default/Certona-ProductPricingJSON'
    }
  },

  data() {
    return {
      products: []
    }
  },
  
  methods: {
    quickView(e) {
      e.preventDefault();
    }
  }
}
</script>
<style lang="scss" src="./style/default.scss"></style>
<style lang="scss" src="./style/primary.scss"></style>
<style lang="scss" src="./style/secondary.scss"></style>
