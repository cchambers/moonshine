export default {
  name: 'BelkBag',
  props: {
    count: Number,
    price: Number
  },

  computed: {
    priceFormatted: function () {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })

      return formatter.format(this.totalPrice);
    }
  },

  data() {
    return {
      itemCount: 0,
      totalPrice: '2.25',
    }
  },

  mounted() {
    if (this.count) this.itemCount = this.count;
    if (this.price) this.totalPrice = this.price;
  },
  
  methods: {
    emitUpdate() {
      this.$bus.$emit('value-changed', {
        itemCount: this.itemCount,
        totalPrice: this.totalPrice
      });
    }
  },

}