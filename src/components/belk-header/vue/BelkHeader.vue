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
      loggedIn: false,
      data: {
        name: 'Sign In',
        brd: false, // dollars
        brc: false, // tier
        cartQty: false,
        subTotal: false,
      }
    }
  },

  watch: {
    data(val) {
      let self = this;
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
          url = `${location.origin}/on/demandware.store/Sites-Belk-Site/default/Home-HeaderInfo?format=ajax`;
          brdurl = `${location.origin}/on/demandware.store/Sites-Belk-Site/default/BRD-GetBRDDetailsForHeader?format=ajax`;
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
      data.name = data.userDetails.firstName;
      data.auth = data.userDetails.authenticated;
      data.qty = data.cartQty;
      data.total = data.subTotal;
      if (data.auth) this.$el.classList.add('is-user');
    },

    handleBRD(data) {
      data.brc = data.customerType;
      data.brd = data.availableBRDValue;
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
      for (var item in data) {
        let val = data[item];
        let els = document.querySelectorAll(`[fill="${item}"]`)
        els.forEach(el => {
          el.innerText = val;
        });
      }
    }
  },
}
</script>
<style lang="scss" src="../style/default.scss"></style>
