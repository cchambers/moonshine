<template>
  <div class="belk-offer-details flex col align-start"
    :variant="variant">
    <div class="summary" v-if="content.summary">
      <h4 v-if="content.summary.callout">
        {{ content.summary.callout }}
      </h4>
      <div class="price flex">
        <span class="px-18 bold">{{ content.summary.price.sales }}</span>
        <span class="px-12 lowlight-secondary">{{ content.summary.price.original }}</span>
      </div>
      <div class="image"
        v-if="content.summary.image"
        :style="`background-image:url('${content.image}')`">
        {{ content.summary.image.alt || content.summary.image.title }}
      </div>
      <p v-if="content.summary.description">{{ content.summary.description }}</p>
    </div>

    <div class="gifts" v-if="content.gifts">
      <div v-for="item in content.gifts" :key="item">
        <div v-for="image in item.images" :key="image">
          {{ image}}
        </div>
        <p>{{ item.name }}</p>
        <p>{{ item.description }}</p>
      </div>
    </div>

    <div v-if="content.actions" class="margin-t-auto">
      <div v-for="action in content.actions.primary" :key="action">
        <sh-button :link="action.url" full variant="primary">{{ action.text }}</sh-button>
      </div>
      <div v-for="action in content.actions.secondary" :key="action">
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

  data() {
    return {
      content: {},
    };
  },

  methods: {
    events() {
      this.$bus.$on('special-offer-data', this.handleData);
    },

    handleData(data) {
      this.content = { ...data };
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
