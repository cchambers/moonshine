<template>
  <div class="belk-product-list" :id="uniqueId" :variant="variant">
    <ul>
      <li v-for="product in products" v-bind:key="product.index">
        <component :is="belkProduct" v-bind="product"></component>
      </li>
    </ul>
  </div>
</template>

<script>
import ComponentPrototype from '../../../utils/component-prototype';
import BelkProduct from '../../belk-product/vue/BelkProduct.vue';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkProductList',

  props: {
    productsArray: Array,
    uniqueId: String,
  },

  data() {
    return {
      products: [],
      belkProduct: BelkProduct,
    };
  },

  watch: {
    products() {
      this.$bus.$emit('clear-suggestions');
      setTimeout(() => {
        this.$bus.$emit('search-suggestions-loaded');
      });
    },
  },

  methods: {
    events() {
      this.$bus.$on(`${this.uniqueId}-update`, this.handleUpdate);
    },

    quickView(e) {
      e.preventDefault();
    },

    handleUpdate(data) {
      this.$set(this, 'products', data);
    },
  },

  created() {
    if (this.productsArray) this.$set(this, 'products', this.productsArray);
  },

  components: {
    BelkProduct,
  },
};

</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
<style lang="scss" src="../style/secondary.scss"></style>
<style lang="scss" src="../style/tertiary.scss"></style>
