<template>
  <div class="belk-offer-details flex col align-start"
    :variant="variant">
    <div class="summary" v-if="content.summary">
      <h4 v-if="content.summary.callout">
        {{ content.summary.callout }}
      </h4>
      <div v-if="content.summary.price"
        class="price flex start">
        <div v-if="content.summary.price.sales || content.summary.price.original"
          class="px-18 bold">{{ content.summary.price.sales
          || content.summary.price.original }}</div>
        <div v-if="content.summary.price.sales && content.summary.price.original
          && (content.summary.price.original != content.summary.price.sales)"
          class="px-12 margin-l-atomic lowlight-secondary deco-strike">
          {{ content.summary.price.original }}
        </div>
      </div>
      <div class="image"
        v-if="content.summary.image"
        :style="`background-image:url('${content.image.url}')`">
        {{ content.summary.image.alt || content.summary.image.title }}
      </div>
      <p v-if="content.summary.description">{{ content.summary.description }}</p>
    </div>

    <div class="gifts" v-if="content.gifts">
      <div class="item" v-for="item in content.gifts" :key="item.id">
        <div class="images" v-for="image in item.images" :key="image.id">
          <div class="image"
            :style="`background-image:url('${image.url}')`"
            :alt="image.alt"></div>
        </div>
        <p class="name">{{ item.name }}</p>
        <div v-html="item.description"></div>
      </div>
    </div>

    <div
      v-if="content.actions && !hideActions"
      class="offer-detail-actions margin-t-auto pad-y-little">
      <div v-for="action in content.actions.primary" :key="action.id">
        <sh-button :link="action.url" full variant="primary">{{ action.text }}</sh-button>
      </div>
      <div v-for="action in content.actions.secondary" :key="action.id">
        <sh-button :link="action.url" full variant="belk-link">{{ action.text }}</sh-button>
      </div>
    </div>
    <div
      v-if="content.message && !hideMessaging"
      class="offer-detail-messaging margin-t-auto pad-y-little">
      <div class="px-16 back-highlight-secondary lowlight-quinary flex align-start pad-micro">
        <i class="material-icons-round">info</i>
        <p class="px-14 pad-l-atomic">{{ content.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkOfferDetails',

  props: {
    uniqueId: String,
    contentData: {
      type: Object,
    },
    promoId: {
      type: String,
    },
  },

  data() {
    return {
      content: {},
      hideActions: false,
      hideMessaging: false,
    };
  },

  mounted() {
    if (this.contentData) {
      const data = JSON.parse(this.contentData);
      this.handleData(data);
    }
    if (this.promoId) this.getData();
    setTimeout(() => {
      if (window.pageContext) {
        const temp = window.pageContext.ns;
        if (temp === 'product' || temp === 'cart') this.hideActions = true;
        if (temp !== 'product' || this.variant === 'bag') this.hideMessaging = true;
      }
    }, 200);
  },

  methods: {
    events() {
      if (this.uniqueId) {
        this.$bus.$on(`special-offer-data-${this.uniqueId}`, (data) => {
          this.handleData(data);
        });
      } else {
        this.$bus.$on('special-offer-data', (data) => {
          this.handleData(data);
        });
      }
    },

    getData() {
      let url = this.checkDev() ? 'https://devweb-ecdn.belkdev.com' : window.location.origin;
      url += `/on/demandware.store/Sites-Belk-Site/default/Product-ShowSpecialOfferDetails?promoId=${this.promoId}`;
      fetch(url)
        .then((response) => response.json())
        .then(this.handleData);
    },

    handleData(data) {
      this.content = { ...data };
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/modal.scss"></style>
<style lang="scss" src="../style/bag.scss"></style>
