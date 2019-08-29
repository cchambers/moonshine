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
export default {
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
      itemCount: 0
    };
  },

  mounted() {
    if (this.count) this.itemCount = this.count;
  },

  methods: {
    emitUpdate() {
      this.$bus.$emit("value-changed", {
        itemCount: this.itemCount,
        totalPrice: this.totalPrice
      });
    }
  }
};
</script>
<style lang="scss" src="./style/default.scss"></style>
