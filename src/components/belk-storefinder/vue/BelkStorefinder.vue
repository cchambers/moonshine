<template>
  <div class="belk-storefinder">
    <sh-nav-item
      v-if="hasStoreAddress"
      boundaries-selector="#primary-nav"
      variant="primary"
      has-arrow
      :foreground-selector="foreground"
    >
      <div slot="reference">
        <belk-icon name="map-pin" width="9" class="margin-r-atomic"></belk-icon>
        <span>{{ storeName }}</span>
      </div>
      <div slot="content">
        <ul>
          <li class="store-hours">
            Open Today {{ storeHours }}
          </li>
          <li class="store-address">
            <span>{{ address1 }}</span><br>
            <span>{{ address2 }}</span><br>
            <span>{{ city }}</span>,
            <span>{{ stateCode }}</span>,
            <span>{{ postalCode }}</span><br>
            <span>{{ phoneNumber }}</span>
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
      class="findastore-link"
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
      storeName: null,
      storeHours: null,
      address1: null,
      address2: null,
      city: null,
      stateCode: null,
      postalCode: null,
      phoneNumber: null,
      headerInfoUrl: null,
    };
  },

  beforeMount() {
    const xhr = new XMLHttpRequest();

    if (window.Urls) {
      this.headerInfoUrl = window.Urls.headerInfo;
    } else {
      let { origin } = window.location;
      if (origin.indexOf('localhost') >= 0) origin = '//dev33-web-belk.demandware.net';
      this.headerInfoUrl = `${origin}/on/demandware.store/Sites-Belk-Site/default/Home-HeaderInfo?format=ajax`;
    }

    xhr.open('GET', this.headerInfoUrl);
    xhr.send(null);
    xhr.onreadystatechange = () => {
      const DONE = 4;
      const OK = 200;
      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
          let res;
          try {
            res = JSON.parse(xhr.responseText);
          } catch (e) {
            // Oh well...
          }
          this.setStoreAddress(res);
        }
      }
    };
  },

  methods: {
    setStoreAddress(data) {
      this.hasStoreAddress = true;
      this.storeName = data.storeDetails.storeName;
      this.storeHours = data.storeDetails.storeHours;
      this.address1 = data.storeDetails.address1;
      this.address2 = data.storeDetails.address2;
      this.city = data.storeDetails.city;
      this.stateCode = data.storeDetails.stateCode;
      this.postalCode = data.storeDetails.postalCode;
      this.phoneNumber = data.storeDetails.phoneNumber;
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
