<template>
<div></div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkHeader',

  props: {
    primaryTrigger: {
      type: Number,
      default: 30,
    },
    tertiaryTrigger: {
      type: Number,
      default: 300,
    },
  },

  data() {
    return {
      actual: {},
      bagEl: {},
      navEl: {},
      searchEl: {},
      state: 'default',
      lastScrollTop: 0,
      loggedIn: false,
      headerData: {
        name: 'Sign In',
        brd: false, // dollars
        brc: false, // tier
        store: false,
        cartQty: false,
        subTotal: false,
      },
      baseData: false,
      brdData: false,
    };
  },

  computed: {
    hasAllData() {
      return (this.baseData && this.brdData);
    },
  },

  watch: {
    headerData(val) {
      const self = this;
      clearTimeout(self.dataDebounce);
      self.dataDebounce = setTimeout(() => {
        self.setItem('belkUserData', val, true);
        self.updateContainers(val);
        self.clearForEmit();
      }, 20);
    },
  },

  mounted() {
    this.actual = document.querySelector('header.belk-header');
    this.bagEl = document.querySelector('belk-bag');
    this.setupEvents();
    this.getData();
    const tert = document.querySelector('nav.lazy');
    if (tert) tert.classList.remove('lazy');
  },

  methods: {
    setupEvents() {
      const self = this;
      self.$bus.$on('smooth-scroll', self.smoothScrollHandler);
      self.$bus.$on('get-user-data', self.clearForEmit);
      self.$bus.$on('bag-update', self.bagUpdateHandler);
      this.$bus.$on('scroll-event', self.scrollHandler);
    },

    smoothScrollHandler(event) {
      const delay = event.detail.delay || 2000;
      document.documentElement.classList.remove('no-smooth-scroll');
      setTimeout(() => {
        document.documentElement.classList.add('no-smooth-scroll');
      }, delay);
    },

    clearForEmit() {
      const self = this;
      if (self.hasAllData) {
        clearTimeout(self.emitTimer);
        self.$bus.$emit('user-data', self.headerData);
      } else {
        self.emitTimer = setTimeout(self.clearForEmit, 50);
      }
    },

    getData() {
      const self = this;
      // let sessionData = self.getItem('belkUserData', true);
      // if (sessionData && !forceUpdate) {
      //   self.headerData = self.sessionData;
      // } else {
      let url;
      let brdurl;
      if (window.Urls) {
        url = window.Urls.headerInfo;
        brdurl = window.Urls.getBRDDetailsForHeader;
      } else {
        let { origin } = window.location;
        if (origin.indexOf('localhost') >= 0) origin = '//dev29-web-belk.demandware.net';
        url = `${origin}/on/demandware.store/Sites-Belk-Site/default/Home-HeaderInfo?format=ajax`;
        brdurl = `${origin}/on/demandware.store/Sites-Belk-Site/default/BRD-GetBRDDetailsForHeader?format=ajax`;
        self.recheckUrls();
      }
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
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

            self.handleHeader(res);
          }
        }
      };

      const savedResponse = (window.sessionAttributes)
        ? window.SessionAttributes.AVAILABLE_BRDS : false;
      if (savedResponse) {
        self.handleBRD(savedResponse);
      } else {
        const brdxhr = new XMLHttpRequest();
        brdxhr.open('GET', brdurl);
        brdxhr.send(null);
        brdxhr.onreadystatechange = () => {
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
      }
    },

    recheckUrls() {
      const self = this;
      setTimeout(() => {
        if (window.Urls) self.getData();
      }, 500);
    },

    handleHeader(data) {
      this.updateWindow(data);
      this.$set(this.headerData, 'name', data.userDetails.firstName);
      this.$set(this.headerData, 'auth', data.userDetails.authenticated);
      this.$set(this.headerData, 'qty', data.cartQty);
      this.$set(this.headerData, 'total', data.subTotal);
      this.$set(this.headerData, 'store', data.storeName);
      if (this.headerData.auth) this.$el.classList.add('is-user');
      this.baseData = true;
    },

    handleBRD(data) {
      if (data) {
        this.updateWindow(data);
        this.$set(this.headerData, 'brc', data.customerType);
        this.$set(this.headerData, 'brd', data.availableBRDValue);
        this.brdData = true;
      }
    },

    bagUpdateHandler(data) {
      if (!this.loggedIn) {
        this.bagState(0);
      } else if (data.count === 0) {
        this.bagState(1);
      } else {
        this.bagState(2);
      }
    },

    updateWindow(data) {
      if (window.headerInfo) {
        window.headerInfo = { ...window.headerInfo, ...data };
      } else {
        window.headerInfo = { ...data };
      }
    },

    bagState(num) {
      this.actual.setAttribute('bag-state', num);
    },

    scrollHandler(e) {
      if (this.elementContains(this.$el, e.target)) return;
      const st = window.pageYOffset || document.documentElement.scrollTop;
      const scrollingDown = (st > this.lastScrollTop);
      let state = 0;

      if (scrollingDown) { // scrolling down
        state = (st >= this.primaryTrigger) ? 1 : 0; // distance for primary trigger
        this.scrollDist += (st - this.lastScrollTop);
        if (this.scrollDist > this.tertiaryTrigger) state = 2;
      } else { // scrolling up
        state = 1;
        this.scrollDist = 0;
        if (st < this.primaryTrigger) state = 0;
      }
      this.scrollState(state);
      this.lastScrollTop = st <= 0 ? 0 : st;
    },

    scrollState(num) {
      this.actual.setAttribute('scroll-state', num);
    },

    updateContainers(data) {
      const keys = Object.keys(data);
      const values = Object.values(data);
      for (let i = 0; i < keys.length; i += 1) {
        const val = values[i];
        const els = document.querySelectorAll(`[fill="${keys[i]}"]`);
        els.forEach((el) => {
          const target = el;
          target.innerText = val;
          target.setAttribute('filled', true);
        });
      }
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
