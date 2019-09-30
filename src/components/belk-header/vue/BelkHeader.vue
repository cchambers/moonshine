<template>
<div></div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkHeader',

  data() {
    return {
      bagEl: {},
      navEl: {},
      searchEl: {},
      loggedIn: false,
      headerData: {
        name: 'Sign In',
        brd: false, // dollars
        brc: false, // tier
        store: false,
        cartQty: false,
        subTotal: false,
      },
    };
  },

  watch: {
    headerData(val) {
      const self = this;
      clearTimeout(self._dataDebounce);
      self._dataDebounce = setTimeout(() => {
        self.setItem('belkUserData', val, true);
        self.$bus.$emit('user-data', val);
        self.updateContainers(val);
      }, 50);
    },
  },

  mounted() {
    const self = this;
    self.actual = document.querySelector('#header .belk-header');
    self.bagEl = document.querySelector('belk-bag');
    self.setupEvents();
    self.getData();
  },

  methods: {
    setupEvents() {
      const self = this;
      self.$bus.$on('get-user-data', self.emitUserData);
      self.$bus.$on('bag-update', self.bagUpdateHandler);
    },

    emitUserData() {
      this.$bus.$emit('user-data', this.headerData);
    },

    getData() {
      const self = this;
      // let sessionData = self.getItem('belkUserData', true);
      // if (sessionData && !forceUpdate) {
      //   self.headerData = self.sessionData;
      // } else {
      let url; let
        brdurl;
      if (window.Urls) {
        url = window.Urls.headerInfo;
        brdurl = window.Urls.getBRDDetailsForHeader;
      } else {
        let { origin } = location;
        if (origin.indexOf('localhost') >= 0) origin = '//dev29-web-belk.demandware.net';
        url = `${origin}/on/demandware.store/Sites-Belk-Site/default/Home-HeaderInfo?format=ajax`;
        brdurl = `${origin}/on/demandware.store/Sites-Belk-Site/default/BRD-GetBRDDetailsForHeader?format=ajax`;
        // self.recheckUrls();
      }
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send(null);
      xhr.onreadystatechange = function () {
        const DONE = 4;
        const OK = 200;
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            let res;
            try {
              res = JSON.parse(xhr.responseText);
            } catch (e) {
              // Oh well, but whatever...
            }

            self.handleHeader(res);
          }
        }
      };

      const brdxhr = new XMLHttpRequest();
      brdxhr.open('GET', brdurl);
      brdxhr.send(null);
      brdxhr.onreadystatechange = function () {
        const DONE = 4;
        const OK = 200;
        if (brdxhr.readyState === DONE) {
          if (brdxhr.status === OK) {
            let res;
            try {
              res = JSON.parse(brdxhr.responseText);
            } catch (e) {
              // Oh well, but whatever...
            }
            self.handleBRD(res);
          }
        }
      };
      // }
    },

    recheckUrls() {
      const self = this;
      setTimeout(() => {
        if (window.Urls) self.getData();
      }, 500);
    },

    handleHeader(data) {
      this.$set(this.headerData, 'name', data.userDetails.firstName);
      this.$set(this.headerData, 'auth', data.userDetails.authenticated);
      this.$set(this.headerData, 'qty', data.cartQty);
      this.$set(this.headerData, 'total', data.subTotal);
      this.$set(this.headerData, 'store', data.storeName);
      if (this.headerData.auth) this.$el.classList.add('is-user');
    },

    handleBRD(data) {
      this.$set(this.headerData, 'brc', data.customerType);
      this.$set(this.headerData, 'brd', data.availableBRDValue);
    },

    bagUpdateHandler(data) {
      if (!this.loggedIn) {
        this.bagState(0);
      } else if (data.count == 0) {
        this.bagState(1);
      } else {
        this.bagState(2);
      }
    },

    bagState(num) {
      this.actual.setAttribute('bag-state', num);
    },

    updateContainers(data) {
      for (const item in data) {
        const val = data[item];
        if (val) {
          const els = document.querySelectorAll(`[fill="${item}"]`);
          els.forEach((el) => {
            el.innerText = val;
            el.setAttribute('filled', true);
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
