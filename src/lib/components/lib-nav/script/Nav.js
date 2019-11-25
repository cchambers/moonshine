import ComponentPrototype from '../../../../components/component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Nav',

  data() {
    return {
      search: '',
      results: [],
      filteredResults: [],
      items: {},
      navShown: false,
      prodFilter: false,
      usedShortcut: false,
    };
  },

  watch: {
    navShown(val) {
      if (val) {
        document.documentElement.classList.add('nav-shown');
        this.handleActive();
      } else {
        document.documentElement.classList.remove('nav-shown');
      }
    },
  },

  mounted() {
    const self = this;
    setTimeout(() => {
      self.items = window.schema;
      document.body.classList.add('ready');
    });

    if (window.location.pathname === '/') this.navShown = true;

    const prodFilter = window.localStorage.getItem('prod-filter');
    if (prodFilter) this.prodFilter = prodFilter;

    const usedShortcut = window.localStorage.getItem('used-shortcut');
    if (usedShortcut) this.usedShortcut = usedShortcut;
  },

  methods: {
    events() {
      const self = this;

      window.addEventListener('keyup', (e) => {
        const key = e.keyCode;
        if (key === 192) {
          window.localStorage.setItem('used-shortcut', true);
          self.$bus.$emit('close-modals');
          self.toggleNav();
        }
      });

      this.$bus.$on('nav-closed', this.navToggledHandler);
      this.$bus.$on('nav-toggled', this.navToggledHandler);
    },

    shouldHide(prod) {
      const hide = (this.prodFilter && !prod);
      return hide;
    },

    handleActive() {
      const activeEl = document.querySelector(`nav [href$="${window.location.pathname}"]`);
      if (activeEl) activeEl.classList.add('active');
    },

    toggleNav() {
      this.navShown = !this.navShown;
    },

    toggleFilter() {
      this.prodFilter = !this.prodFilter;
      window.localStorage.setItem('prod-filter', this.prodFilter);
    },

    closeNav() {
      this.$bus.$emit('close-nav');
    },

    goHome() {
      window.location.pathname = '/';
    },

    /* eslint-disable */
    doSearch(e) {
      let value = this.search;
      if (value === "") {
        this.filteredResults = [];
      } else {
        let filteredResults = [];
      }
    },

    isCurrent(element) {
      const index = window.location.pathname;
      const test = (index.indexOf(element) > -1);
      return test;
    }
  }
}
