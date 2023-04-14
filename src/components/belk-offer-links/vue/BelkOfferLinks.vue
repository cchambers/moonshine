<template>
  <div class="belk-offer-links"
    :variant="variant" v-if="content.length">
    <div v-for="item in content" :key="item.upc">
    <sh-button
      variant="belk-link"
      scale="80"
      class="lowlight-primary"
      click-event="show-special-offer-modal"
      :value="item.promoId">
      {{ item.message }}
    </sh-button>
    </div>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkOfferLinks',

  props: {
    pid: {
      type: String,
    },
  },

  data() {
    return {
      content: [],
    };
  },

  created() {
    if (this.pid) this.getData();
  },

  methods: {
    getData() {
      let url = this.checkDev() ? 'https://devweb-ecdn.belkdev.com' : window.location.origin;
      url += `/on/demandware.store/Sites-Belk-Site/default/Product-VariationProductJSON?pid=${this.pid}&calculateVariation=false`;
      fetch(url)
        .then((response) => response.json())
        .then(this.handleData);
    },

    handleData(data) {
      const product = data.cached.skus[this.pid];
      if (product) {
        const promotions = product.promotions;
        if (promotions) this.content = [ ...data ];
      }
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
