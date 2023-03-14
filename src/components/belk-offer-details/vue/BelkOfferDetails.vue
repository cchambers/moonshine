<template>
  <div class="belk-offer-details flex col align-start"
    :variant="variant">
    <div class="summary" v-if="content.summary">
      <h4 v-if="content.summary.callout">
        {{ content.summary.callout }}
      </h4>
      <div v-if="content.summary.price"
        class="price flex">
        <span v-if="content.summary.price.sales"
          class="px-18 bold">{{ content.summary.price.sales }}</span>
        <span v-if="content.summary.price.original"
          class="px-12 lowlight-secondary">{{ content.summary.price.original }}</span>
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

    <div v-if="content.actions" class="margin-t-auto offer-detail-actions">
      <div v-for="action in content.actions.primary" :key="action.id">
        <sh-button :link="action.url" full variant="primary">{{ action.text }}</sh-button>
      </div>
      <div v-for="action in content.actions.secondary" :key="action.id">
        <sh-button :link="action.url" full variant="belk-link">{{ action.text }}</sh-button>
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
    giftId: {
      type: String,
    },
  },

  data() {
    return {
      content: {},
    };
  },

  mounted() {
    if (this.contentData) {
      const data = JSON.parse(this.contentData);
      this.handleData(data);
    }
    if (this.giftId) this.getData();
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
      fetch(`${window.location.origin}/on/demandware.store/Sites-Belk-Site/default/Product-ShowSpecialOfferDetails?promoId=${this.giftId}`)
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
