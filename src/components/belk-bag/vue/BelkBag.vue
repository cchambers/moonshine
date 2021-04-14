<template>
  <div class="belk-bag"
    :variant="variant"
    :count="itemCount"
    v-bind:class="{ active: itemCount > 0 }">
    <template v-if="hasData">
      <sh-popper :disabled="isDisabled" offset-x="-42" placement="bottom" reference-id="belk-bag">
        <div slot="reference">
          <div class="bag-icon">
            <belk-icon width="33" height="40" name="bag">shopping bag</belk-icon>
            <div class="bag-count">{{ itemCount }}</div>
          </div>
          <div class="bag-total">{{ totalPrice }}</div>
        </div>
        <div class="bag-content" slot="content">
          <div class="has-items">
            <div class="scrolling-area">
              <div class="text-center pad-little px-16">
                <span class="bold">Bag Subtotal</span> <span>{{ totalPrice }}</span>
              </div>
              <belk-shipping-note class="flex center"></belk-shipping-note>
              <div class="hr margin-y-micro"></div>
              <ul class="bag-list belk-product-list" variant="tertiary">
                <li v-for="product in items" v-bind:key="product.index">
                  <component :is="belkProduct" variant="bag" v-bind="product"></component>
                </li>
              </ul>
            </div>
            <div class="pad-x-micro pad-b-micro">
              <sh-button variant="primary" full link="/shopping-bag">
                View Bag &amp; Checkout
              </sh-button>
            </div>
          </div>
          <div class="no-items pad-y-little">
            <div>
              <h4>Your bag is empty &amp; could use some love.</h4>
              <p class="pad-top-little text-center">
                Sign in to see items you may have added to your bag.
              </p>
            </div>
          </div>
        </div>
      </sh-popper>
    </template>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';
import BelkProduct from '../../belk-product/vue/BelkProduct.vue';
import MoneyFormatter from '../../money-formatter';

export default {
  mixins: [ComponentPrototype, MoneyFormatter],

  name: 'BelkBag',

  watch: {
    subTotal(val) {
      let total = val;
      if (total === 0) {
        total = 'Bag';
      } else {
        total = this.format(total);
      }
      this.totalPrice = total;
    },
  },

  data() {
    return {
      items: [],
      itemCount: 0,
      subTotal: 0,
      totalPrice: 'Bag',
      isDisabled: false,
      hasData: false,
      belkProduct: BelkProduct,
    };
  },

  created() {
    if (window.location.href.indexOf('shopping-bag') > 0) this.isDisabled = true;
  },

  methods: {
    events() {
      this.$bus.$on('user-data', this.handleUserData);
    },

    handleUserData(data) {
      if (data.qty) this.$set(this, 'itemCount', parseInt(data.qty, 10));
      if (data.subTotal) this.$set(this, 'subTotal', data.subTotal);
      if (data.cart) {
        this.$set(this, 'items', data.cart.items);
        setTimeout(() => {
          this.$bus.$emit('bag-list-update', data.cart.items);
        }, 100);
      }
      this.hasData = true;
    },

    emitUpdate() {
      this.$bus.$emit('value-changed', {
        itemCount: this.itemCount,
        totalPrice: this.totalPrice,
      });
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
