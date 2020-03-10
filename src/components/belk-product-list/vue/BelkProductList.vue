<template>
  <div class="belk-product-list" :variant="variant">
    <ul>
      <li v-for="product in products" v-bind:key="product.index">
        <component :is="belkProduct" v-bind="product"></component>
      </li>
    </ul>
  </div>
</template>

<script>
import BelkProduct from '../../belk-product/vue/BelkProduct.vue';
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkProductList',

  data() {
    return {
      products: [],
      belkProduct: BelkProduct,
    };
  },

  methods: {
    quickView(e) {
      e.preventDefault();
    },
  },

  components: {
    BelkProduct,
  },
};

</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
<style lang="scss" src="../style/secondary.scss"></style>
