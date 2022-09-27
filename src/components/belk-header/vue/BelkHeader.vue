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
      header: {},
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
        cart: false,
        auth: false,
      },
      baseData: false,
      brdData: false,
    };
  },

  computed: {
    hasAllData() {
      return (this.baseData);
    },
  },

  watch: {
    headerData: {
      deep: true,
      handler(val) {
        const self = this;
        clearTimeout(self.dataDebounce);
        self.dataDebounce = setTimeout(() => {
          self.setItem('belkUserData', val, true);
          self.updateContainers(val);
          self.clearForEmit();
        }, 20);
      },
    },
  },

  mounted() {
    this.actual = document.querySelector('header.belk-header .primary-secondary-tertiary');
    this.header = document.querySelector('header.belk-header');
    this.bagEl = document.querySelector('belk-bag');
    this.setupEvents();
    this.getData();
    const tert = document.querySelector('nav.lazy');
    if (tert) tert.classList.remove('lazy');
    const resizeDebounced = this.debounce('adapt-db', this.resizeHandler, 50);
    window.addEventListener('resize', resizeDebounced, true);
    setTimeout(this.updateHeightProp, 400);
  },

  methods: {
    setupEvents() {
      const self = this;
      self.$bus.$on('header-update', self.updateHeightProp);
      self.$bus.$on('smooth-scroll', self.smoothScrollHandler);
      self.$bus.$on('get-user-data', self.sendUserData);
      self.$bus.$on('update-fills', self.postUpdate);
      self.$bus.$on('bag-update', self.bagUpdateHandler);
      // this.$bus.$on('scroll-event', self.scrollHandler);
      this.$bus.$on('do-data', self.blah);
      this.$bus.$on('fetch-user-data', self.getData);
    },

    resizeHandler() {
      this.updateHeightProp();
    },

    smoothScrollHandler(event) {
      const delay = event.detail.delay || 2000;
      document.documentElement.classList.remove('no-smooth-scroll');
      setTimeout(() => {
        document.documentElement.classList.add('no-smooth-scroll');
      }, delay);
    },

    sendUserData(ce) {
      if (this.hasAllData) {
        ce.handleData(this.headerData);
      }
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
      let url;
      if (window.Urls) {
        url = window.Urls.headerData;
      } else {
        let { origin } = window.location;
        if (origin.indexOf('localhost') >= 0) origin = '//dev29-web-belk.demandware.net';
        url = `${origin}/on/demandware.store/Sites-Belk-Site/default/Header-Data?format=ajax`;
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
    },

    recheckUrls() {
      const self = this;
      setTimeout(() => {
        if (window.Urls) self.getData();
      }, 500);
    },

    blah(data) {
      this.handleHeader(data.data);
    },

    handleHeader(data) {
      this.updateWindow(data);
      this.$set(this.headerData, 'name', data.userDetails.firstName);
      this.$set(this.headerData, 'auth', data.userDetails.authenticated);
      this.$set(this.headerData, 'qty', data.cartQty);
      this.$set(this.headerData, 'subTotal', data.subTotal);
      this.$set(this.headerData, 'brc', data.userDetails.customerType);
      if (data.brd) this.$set(this.headerData, 'brd', data.brd.availableBRDValue);
      if (data.storeDetails.storeName) this.$set(this.headerData, 'store', data.storeDetails);
      this.$set(this.headerData, 'cart', data.cart);
      if (data.userDetails.firstName) document.documentElement.classList.add('is-user');
      this.baseData = true;
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

    // scrollHandler(e) {
    //   if (this.elementContains(this.$el, e.target)) return;
    //   const st = window.pageYOffset || document.documentElement.scrollTop;
    //   const scrollingDown = (st > this.lastScrollTop);
    //   let state = 0;

    //   if (scrollingDown) { // scrolling down
    //     state = (st >= this.primaryTrigger) ? 1 : 0; // distance for primary trigger
    //     this.scrollDist += (st - this.lastScrollTop);
    //     if (this.scrollDist > this.tertiaryTrigger) state = 2;
    //   } else { // scrolling up
    //     state = 1;
    //     this.scrollDist = 0;
    //     if (st < this.primaryTrigger) state = 0;
    //   }
    //   this.scrollState(state);
    //   this.lastScrollTop = st <= 0 ? 0 : st;

    //   // setTimeout(() => {
    //   //   this.updateHeightProp();
    //   // }, 150);
    // },

    updateHeightProp() {
      setTimeout(() => {
        if (this.header) document.documentElement.style.setProperty('--header-height', `${this.header.clientHeight}px`);
      }, 10);
    },

    scrollState(num) {
      if (this.actual) {
        this.actual.setAttribute('scroll-state', num);
        this.updateHeightProp();
      }
    },

    postUpdate() {
      this.updateContainers(this.headerData);
    },

    updateContainers(data) {
      let obj = {};
      if (data.store) {
        obj = {
          ...data,
          ...data.store,
        };
      } else {
        obj = data;
      }
      const keys = Object.keys(obj);
      const values = Object.values(obj);
      for (let i = 0; i < keys.length; i += 1) {
        let val = values[i];
        if (val) {
          setTimeout(() => {
            const els = document.querySelectorAll(`[data-fill="${keys[i]}"]`);
            els.forEach((el) => {
              const target = el;
              if (typeof val === 'string' && val.length
                && (val.toUpperCase() === val || val.toLowerCase() === val)) {
                val = val.toTitleCase();
              }
              target.innerText = val;
              target.setAttribute('filled', true);
            });
          }, 50);
        }
      }
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
