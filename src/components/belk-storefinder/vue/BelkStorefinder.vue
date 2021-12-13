<template>
  <div class="belk-storefinder">
    <sh-nav-item
      v-if="hasData"
      has-arrow
      boundaries-selector="#primary-nav"
      :foreground-selector="this.foreground">
      <div slot="reference" class="nav-link">
        <belk-icon name="map-pin" width="10" height="15" class="margin-r-atomic"></belk-icon>
        <span>{{ storeData.storeName }}</span>
      </div>
      <div slot="content">
        <ul class="lh-20">
          <li class="margin-b-little">
            Open Today {{ storeData.storeHours }}
          </li>
          <li class="margin-b-little">
            <div>{{ storeData.address1 }}</div>
            <div>{{ storeData.address2 }}</div>
            <div>
              <span>{{ storeData.city }}</span>,
              <span>{{ storeData.stateCode }}</span>,
              <span>{{ zip }}</span>
            </div>
            <phone-number class="bold" :in="storeData.phoneNumber"></phone-number>
          </li>
          <li>
            <a class="belk-link accent-primary" :href="storefinderLink">
              Find Other Stores
            </a>
          </li>
        </ul>
      </div>
    </sh-nav-item>
    <a v-else class="nav-link"
      :href="storefinderLink">
      <belk-icon name="map-pin" width="9" class="margin-r-atomic"></belk-icon>
      Find A Store
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
      default: '.primary-secondary-tertiary',
    },
  },

  watch: {
    storeData(val) {
      if (val.postalCode) {
        const zip = val.postalCode.split('-')[0];
        this.$set(this, 'zip', zip);
      }
    },
  },

  data() {
    return {
      hasData: false,
      storeData: {},
      zip: null,
    };
  },

  methods: {
    events() {
      this.$bus.$on('user-data', this.handleUserData);
    },

    handleUserData(data) {
      if (data.store) {
        if (data.store.storeName !== '') {
          this.storeData = data.store;
          this.toggleData();
        }
      }
    },

    toggleData() {
      // trigger re-render in v-if container
      let timer = 0;
      if (this.hasData) {
        this.$set(this, 'hasData', false);
        timer = 1;
      }
      setTimeout(() => {
        this.$set(this, 'hasData', true);
      }, timer);
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
