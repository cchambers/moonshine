<template>
  <div class="belk-bag" :variant="variant" v-bind:class="{ active: itemCount > 0 }">
    <div class="bag-icon">
      <belk-icon width="30" name="bag">shopping bag</belk-icon>
      <div class="bag-count">{{ itemCount }}</div>
    </div>
    <div class="bag-total">{{ totalPrice }}</div>
  </div>
</template>

<script>
//import ComponentPrototype from '../../components/component-prototype';

export default {
  //mixins: [ComponentPrototype],

  name: "BelkBag",
  props: {
    count: Number,
    price: Number
  },

  computed: {
    totalPrice() {
      let price = this.price;
      if (this.price == 0) {
        return "Bag";
      } else {
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2
        });

        return formatter.format(price);
      }
    }
  },

  data() {
    return {
      itemCount: 0,
      subTotal: false
    };
  },

  mounted() {
    if (this.count) this.itemCount = this.count;
  },

  methods: {
    events() {
      this.$bus.$on('user-data', this.handleUserData)
    },

    handleUserData(data) {
      if (data.cartQty) this.itemCount = data.cartQty;
      if (data.subTotal) this.subTotal = data.subTotal;
    },

    emitUpdate() {
      this.$bus.$emit('value-changed', {
        itemCount: this.itemCount,
        totalPrice: this.totalPrice
      });
    }
  }
};
</script>
<style lang="scss" src="./style/default.scss"></style>
