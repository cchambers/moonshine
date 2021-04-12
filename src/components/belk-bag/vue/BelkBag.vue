<template>
  <div class="belk-bag" :variant="variant" v-bind:class="{ active: itemCount > 0 }">
    <sh-popper :disabled="isDisabled" offset-x="-41" placement="bottom" reference-id="belk-bag">
      <div slot="reference">
        <div class="bag-icon">
          <belk-icon width="33" height="40" name="bag">shopping bag</belk-icon>
          <div class="bag-count">{{ itemCount }}</div>
        </div>
        <div class="bag-total">{{ totalPrice }}</div>
      </div>
      <div class="bag-content" slot="content">
        <div v-if="itemCount > 0">
          <div>
            <span class="bold">Bag Subtotal</span>
            <span>{{ subTotal }}</span>
          </div>
          <component
            ref="freeShippingMessage"
            class="text-center"
            v-bind:is="belkShippingNote">
          </component>
          <component
            ref="itemList"
            v-bind:is="belkProductList"
            v-bind:product-array="items"
            variant="secondary">
          </component>
          <sh-button class="primary" link="/shopping-bag">View Bag &amp; Checkout</sh-button>
        </div>
        <div v-if="itemCount === 0">
          <div>
            <h4>Your bag is empty &amp; could use some love.</h4>
            <p class="pad-little text-center">
              Sign in to see items you may have added to your bag.
            </p>
          </div>
        </div>
      </div>
    </sh-popper>
  </div>
</template>

<script>
import BelkProductList from '../../belk-product-list/vue/BelkProductList.vue';
import BelkShippingNote from '../../belk-shipping-note/vue/BelkShippingNote.vue';
import ComponentPrototype from '../../component-prototype';
import MoneyFormatter from '../../money-formatter';

export default {
  mixins: [ComponentPrototype, MoneyFormatter],

  name: 'BelkBag',
  props: {
    count: Number,
    total: {
      type: Number,
      default: 0,
    },
    belkProductList: BelkProductList,
    belkShippingNote: BelkShippingNote,
  },

  components: {
    BelkProductList,
    BelkShippingNote,
  },

  computed: {
    totalPrice() {
      const total = parseInt(this.total, 10);
      if (total === 0) {
        return 'Bag';
      }
      return this.format(total);
    },
  },

  data() {
    return {
      items: [],
      itemCount: 0,
      subTotal: 0,
      isDisabled: false,
    };
  },

  created() {
    if (this.count) this.itemCount = this.count;
    if (this.total) this.subTotal = this.subTotal;
    if (window.location.href.indexOf('shopping-bag')) this.isDisabled = true;
  },

  methods: {
    events() {
      this.$bus.$on('user-data', this.handleUserData);
    },

    handleUserData(data) {
      if (data.cartQty) this.itemCount = parseInt(data.cartQty, 10);
      if (data.subTotal) this.subTotal = parseInt(data.subTotal, 10);
      if (data.cart) this.$set(this, 'items', data.cart);
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
