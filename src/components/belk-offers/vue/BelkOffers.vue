<template>
  <div class="belk-offers"
    :variant="variant">
    <slot></slot>
    <belk-coupon v-for="item in items" v-bind:key="item.index"
      in-drawer="true"
      :badge="item.badge"
      :code="item.code"
      :discount="item.discount"
      :description="item.description"
      :details="item.details"
      :ends="item.ends"
      :event-name="item.eventName"
      :extra="item.extra"
      :header-color="item.headerColor"
      :image="item.image"
      :link="item.link"
      :upc="item.upc"></belk-coupon>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkOffers',
  props: {
    itemData: String,
    uniqueId: String,
    variant: String,
  },

  data() {
    return {
      items: [],
    };
  },

  mounted() {
    console.log(this.itemData);
  },

  methods: {
    events() {
      this.$bus.$on('add-offer-item', this.addItemHandler);
      this.$bus.$on('update-offer-items', this.updateItemsHandler);
    },

    addItemHandler(event) {
      if (event.data.which === this.uniqueId) {
        const { data } = event;
        this.items.push(data);
      }
    },

    updateItemsHandler(event) {
      const { data } = event;
      this.items = data.items;
      console.log(data);
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/coupons.scss"></style>
<style lang="scss" src="../style/offers.scss"></style>
<style lang="scss" src="../style/promo.scss"></style>
