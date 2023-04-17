<template>
  <div class="belk-offer-links"
    :variant="variant">
    <div v-for="item in items" :key="item.upc">
      <div class="callout-message" v-if="item.type.toUpperCase() === 'BOGO'">
        {{item.message}}{{' '}}
        <a
          :href="item.offerLink || ''"
          :class="item.offerLink ? 'shopthis-tab' : 'offers-tab'"
        >{{item.offerLink ? 'Shop This Offer': 'View Details'}}</a>
      </div>
      <sh-button
        v-else
        variant="belk-link"
        scale="80"
        class="lowlight-primary"
        click-event="show-special-offer-modal"
        :[`data-${item.eventName}`]="item.finalPromoId"
        :value="item.promoId">
        {{ item.message }}
      </sh-button>
    </div>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

function getEventData(item) {
  switch (item.type.toUpperCase()) {
    case 'GWP':
    case 'GSS':
    case 'PWP':
      return {
        eventName: 'prddetailbonusitemid',
        finalPromoId: item.bonusProductId,
      };
    case 'PYG':
      return {
        eventName: 'pygpromoid',
        finalPromoId: item.promoId,
      };
    default:
      return {};
  }
}

export default {
  mixins: [ComponentPrototype],

  name: 'BelkOfferLinks',

  props: {
    pid: {
      type: String,
    },
    data: {
      type: Array,
    },
  },

  watch: {
    data(newVal) {
      this.update(newVal);
    },
  },

  data() {
    return {
      items: [],
    };
  },

  created() {
    if (this.pid) this.getData();
  },

  mounted() {
    if (this.data) this.items = this.data;
  },

  methods: {
    getData() {
      let url = this.checkDev() ? 'https://devweb-ecdn.belkdev.com' : window.location.origin;
      url += `/on/demandware.store/Sites-Belk-Site/default/Product-VariationProductJSON?pid=${this.pid}&calculateVariation=false`;
      fetch(url)
        .then((response) => response.json())
        .then(this.handleData);
    },

    update(data) {
      this.items = [];
      this.items = data;
    },

    handleData(data) {
      const product = data.cached.skus[this.pid];

      if (product) {
        const { promotions } = product;

        if (promotions) {
          this.items = promotions.map((item) => ({
            ...item,
            ...getEventData(item),
          }));
          this.$forceUpdate();
        }
      }
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
