<template>
<div></div>
</template>

<script>
export default {
  name: 'BelkHeader',

  data() {
    return {
      bagEl: {},
      navEl: {},
      searchEl: {},
      loggedIn: false,
      data: {
        name: 'Sign In',
        brd: false, // dollars
        brc: false, // tier
        store: false,
        cartQty: false,
        subTotal: false,
      }
    }
  },

  watch: {
    data(val) {
      let self = this;
      console.log("DATA UPDATED")

      clearTimeout(self._dataDebounce);
      self._dataDebounce = setTimeout(() => {
        self.setItem('belkUserData', val, true);
        self.$bus.$emit('user-data', val);
        self.updateContainers(val);
      }, 50);
    }
  },

  mounted() {
    let self = this;
    self.actual = document.querySelector('#header .belk-header');
    self.bagEl = document.querySelector('belk-bag');
    self.getData();
  },

  methods: {
    events() {
      this.$bus.$on('mega-nav-opening');
      this.$bus.$on('bag-update', this.bagUpdateHandler);
    },

    getData(forceUpdate) {
      let self = this;
      let sessionData = self.getItem('belkUserData', true);
      if (sessionData && !forceUpdate) {
        self.data = self.sessionData;
      } else {
        let url, brdurl;
        if (window.Urls) {
          url = window.Urls.headerInfo;
          brdurl = window.Urls.getBrdDetailsForHeader;
        } else {
          let origin = location.origin;
          if (origin.indexOf('localhost') >= 0) origin = '//dev29-web-belk.demandware.net';
          url = `${origin}/on/demandware.store/Sites-Belk-Site/default/Home-HeaderInfo?format=ajax`;
          brdurl = `${origin}/on/demandware.store/Sites-Belk-Site/default/BRD-GetBRDDetailsForHeader?format=ajax`;
          // self.recheckUrls();
        }
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send(null);
        xhr.onreadystatechange = function() {
          let DONE = 4;
          let OK = 200;
          if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
              let res = JSON.parse(xhr.responseText);
              self.handleHeader(res);
            }
          }
        };
        
        let brdxhr = new XMLHttpRequest();
        brdxhr.open('GET', brdurl);
        brdxhr.send(null);
        brdxhr.onreadystatechange = function() {
          let DONE = 4;
          let OK = 200;
          if (brdxhr.readyState === DONE) {
            if (brdxhr.status === OK) {
              let res = JSON.parse(brdxhr.responseText);
              self.handleBRD(res);
            }
          }
        };
      }
    },

    recheckUrls() {
      let self = this;
      setTimeout(() => {
        if (window.Urls) self.getData();
      }, 500);
    },

    handleHeader(data) {
      this.data.name = data.userDetails.firstName;
      this.data.auth = data.userDetails.authenticated;
      this.data.qty = data.cartQty;
      this.data.total = data.subTotal;
      this.data.store = data.storeName;
      if (this.data.auth) this.$el.classList.add('is-user');
    },

    handleBRD(data) {
      this.data.brc = data.customerType;
      this.data.brd = data.availableBRDValue;
    },

    bagUpdateHandler(data) {
      if (!this.loggedIn) {
        this.bagState(0);
      } else {
        if (data.count == 0) {
          this.bagState(1);
        } else {
          this.bagState(2);
        }
      }
    },

    bagState(num) {
      this.actual.setAttribute('bag-state', num)
    },

    updateContainers(data) {
      console.log(data);
      for (var item in data) {
        let val = data[item];
        if (val) {
          let els = document.querySelectorAll(`[fill="${item}"]`)
          els.forEach(el => {
            el.innerText = val;
            el.setAttribute('filled', true);
          });
        }
      }
    }
  },
}
</script>
<style lang="scss" src="../style/default.scss"></style>
