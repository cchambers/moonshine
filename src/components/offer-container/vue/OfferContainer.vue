<template>
  <div class="offer-container"
    :variant="variant">
    <belk-coupon v-for="item in items" v-bind:key="item.id"
      :in-drawer="item.inDrawer"
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
      :printable="item.printable"
      :upc="item.upc"></belk-coupon>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'OfferContainer',
  props: {
    itemData: String,
    uniqueId: String,
    variant: String,
    dataObj: String,
  },

  watch: {
    active(val) {
      if (val) this.log(val);
    },
  },

  data() {
    return {
      items: [],
      active: 0,
    };
  },

  mounted() {
    if (typeof window[this.dataObj] === 'object') this.items = window[this.dataObj];
  },

  methods: {
    events() {
      this.$bus.$on('add-offer-item', this.addItemHandler);
      this.$bus.$on('move-offer-item', this.addItemHandler);
      this.$bus.$on('update-offer-items', this.updateItemsHandler);
    },

    addItem(data) {
      const obj = data;
      if (!obj.id) obj.id = `o${this.makeUUID()}`;
      this.items.push(obj);
    },

    addItemHandler(event) {
      if (event.which === this.uniqueId) {
        const { data } = event;
        this.addItem(data);
      }
    },

    moveItemHandler(event) {
      if (event.which === this.uniqueId) {
        const { from } = event.data;
        const { to } = event.data;
        const arr = [...this.items];
        const it = arr.splice(from, 1)[0];
        arr.splice(to, 0, it);
        this.items = arr;
      }
    },

    updateItemsHandler(event) {
      if (event.which === this.uniqueId) {
        const arr = event.data;
        this.items = [];
        for (let x = 0, l = arr.length; x < l; x += 1) {
          this.addItem(arr[x]);
        }
      }
    },

    activate(which) {
      this.$bus.$emit('offer-focus-changing', { id: this.uniqueId, active: this.active });
      this.active = which;
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/coupons.scss"></style>
<style lang="scss" src="../style/offers.scss"></style>
<style lang="scss" src="../style/promo.scss"></style>
