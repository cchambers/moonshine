<template>
  <div class="belk-bag" :variant="variant" v-bind:class="{ active: itemCount > 0 }">
    <sh-popper offset-x="-41" reference-id="belk-bag">
      <div slot="reference">
        <div class="bag-icon">
          <belk-icon width="30" height="40" name="bag">shopping bag</belk-icon>
          <div class="bag-count">{{ itemCount }}</div>
        </div>
        <div class="bag-total">{{ totalPrice }}</div>
      </div>
      <div slot="content">
        <div v-if="itemCount > 0">
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
        <div v-if="itemCount === 0">
          <div class="content-asset">
            <h1>Your bag is empty &amp; could use some love.</h1>
            <p>Sign in to see items you may have added to your bag.</p>
          </div>
        </div>
      </div>
    </sh-popper>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkBag',
  props: {
    count: Number,
    total: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    totalPrice() {
      const total = parseInt(this.total, 10);
      if (total === 0) {
        return 'Bag';
      }
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      });
      return formatter.format(total);
    },
  },

  data() {
    return {
      itemCount: 0,
      subTotal: 0,
    };
  },

  created() {
    if (this.count) this.itemCount = this.count;
    if (this.total) this.subTotal = this.subTotal;
  },

  methods: {
    events() {
      this.$bus.$on('user-data', this.handleUserData);
    },

    handleUserData(data) {
      if (data.cartQty) this.itemCount = parseInt(data.cartQty, 10);
      if (data.subTotal) this.subTotal = parseInt(data.subTotal, 10);
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
