/* eslint-disable */
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