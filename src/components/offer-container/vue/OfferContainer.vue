<template>
  <div class="offer-container"
    :variant="variant">
    <belk-coupon v-for="item in items" v-bind:key="item.id"
      :in-drawer="item.inDrawer"
      :badge="item.badge"
      :coupon-tag="item.couponTag"
      :link-tag="item.linkTag"
      :code="item.code"
      :custom-link="item.customLink"
      :discount="item.discount"
      :description="item.description"
      :details="item.details"
      :details-print="item.detailsPrint"
      :ends="item.ends"
      :event-name="item.eventName"
      :extra="item.extra"
      :to-spend="item.toSpend"
      :header-color="item.headerColor"
      :badge-color="item.badgeColor"
      :image="item.image"
      :link="item.link"
      :printable="item.printable"
      :spacer-text="item.spacerText"
      :upc="item.upc"></belk-coupon>
      <div v-if="items.length == 0" class="offer-container-banner">
        {{ noOffersText }}
      </div>
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
    type: String,
    noOffersText: {
      type: String,
      default: 'None at the moment.',
    },
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
    if (typeof window.pageData === 'object' && this.type) {
      this.items = window.pageData.offers.filter((item) => (item[this.type]));
    }
  },

  methods: {
    events() {
      this.$bus.$on(`add-${this.uniqueId}`, this.addItemHandler);
      this.$bus.$on(`move-${this.uniqueId}`, this.moveItemHandler);
      this.$bus.$on(`update-items-${this.uniqueId}`, this.updateItemsHandler);
    },

    addItem(what, where) {
      const obj = what;
      if (!obj.id) obj.id = `o${this.makeUUID()}`;
      if (!where) {
        this.items.push(obj);
      } else {
        this.items.splice(where, 0, obj);
      }
    },

    // addItemHandler(event) {
    //   const { data } = event;
    //   if (data.where) {
    //     this.addItem(data.what, data.where);
    //   } else {
    //     this.addItem(data);
    //   }
    // },

    addItemHandler(event) {
      const { what } = event.data;
      const where = event.data.where || this.items.length;
      const isArray = Array.isArray(what);
      if (isArray) {
        const arr = [...what];
        this.items.splice(where, 0, ...arr);
      } else {
        this.items.splice(where, 0, what);
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
      const arr = event.data;
      this.items = [];
      for (let x = 0, l = arr.length; x < l; x += 1) {
        this.addItem(arr[x]);
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
