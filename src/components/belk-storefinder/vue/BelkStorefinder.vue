<template>
  <div class="belk-storefinder">
    <sh-nav-item
      v-if="hasStoreAddress"
      has-arrow
      boundaries-selector="#primary-nav"
      foreground-selector="header .pre-and-primary">
      <div slot="reference" class="sf-link">
        <belk-icon name="map-pin" width="9" class="margin-r-atomic"></belk-icon>
        <span>{{ storeData.storeName }}</span>
      </div>
      <div slot="content">
        <ul>
          <li class="margin-b-little">
            Open Today {{ storeData.storeHours }}
          </li>
          <li class="margin-b-little">
            <div>{{ storeData.address1 }}</div>
            <div>{{ storeData.address2 }}</div>
            <div>
              <span>{{ storeData.city }}</span>,
              <span>{{ storeData.stateCode }}</span>,
              <span>{{ storeData.postalCode }}</span>
            </div>
            <div class="bold">{{ storeData.phoneNumber }}</div>
          </li>
          <li>
            <a :href="storefinderLink">
              Find Other Stores
            </a>
          </li>
        </ul>
      </div>
    </sh-nav-item>
    <a v-else
      class="sf-link"
      :href="storefinderLink">
      <belk-icon name="map-pin" width="9" class="margin-r-atomic"></belk-icon>
      Find a Store
    </a>

  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkStorefinder',

  props: {
    storefinderLink: {
      type: String,
      default: '/stores/',
    },
    foreground: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      hasStoreAddress: false,
      storeData: {},
    };
  },

  methods: {
    events() {
      this.$bus.$on('user-data', this.handleUserData);
    },
    handleUserData(data) {
      if (data.store) {
        this.storeData = data.store;
        this.hasStoreAddress = true;
      }
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
