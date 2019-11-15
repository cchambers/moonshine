<template>
  <div class="belk-products" :variant="variant">
    <ul>
      <li v-for="product in products" v-bind:key="product.index">
        <belk-product v-bind:product-data="product"></belk-product>
      </li>
    </ul>
  </div>
</template>

<script>
import BelkPrice from '../belk-price/BelkPrice.vue';
import ComponentPrototype from '../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkProducts',

  data() {
    return {
      products: [],
    };
  },

  watch: {
    data(val) {
      // eslint-disable-next-line
      console.log(val);
    },
  },

  methods: {
    quickView(e) {
      e.preventDefault();
    },
  },

  components: {
    BelkPrice,
  },
};

</script>
<style lang="scss" src="./style/default.scss"></style>
<style lang="scss" src="./style/primary.scss"></style>
<style lang="scss" src="./style/secondary.scss"></style>
