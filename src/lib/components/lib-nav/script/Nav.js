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
  },

  methods: {
    events() {
      const self = this;

      window.addEventListener('keyup', (e) => {
        const key = e.keyCode;
        if (key === 192) {
          self.$bus.$emit('close-modals');
          self.toggleNav();
        }
      });

      window.addEventListener('keydown', (e) => {
        if (document.documentElement.classList.contains('nav-shown')) {
          const key = e.keyCode;
          if (key === 192) {
            e.preventDefault();
            return;
          }
          if (document.activeElement !== self.$refs.search && key !== 9) {
            self.$refs.search.focus();
          }
        }
      });
      this.$bus.$on('nav-closed', this.navToggledHandler);
      this.$bus.$on('nav-toggled', this.navToggledHandler);
    },

    handleActive() {
      const activePage = window.location.pathname.split('/')
        .pop();
      const activeEl = document.querySelector(`[href$="${activePage}"]`);
      if (activeEl) activeEl.classList.add('active');
    },

    toggleNav() {
      this.navShown = !this.navShown;
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
        for (let x = 0, l = this.results.length; x < l; x += 1) {
          let item = JSON.parse(JSON.stringify(this.results[x]));
          let name = item.reset.toLowerCase();
          let match = name.indexOf(value.toLowerCase());
          if (match >= 0) {
            item.show = true;
            let actual = item.name.substr(match, value.length);
            let highlighted = item.name.split(actual);
            highlighted = highlighted.join(`<span class="search-highlight">${actual}</span>`);
            item.name = highlighted;
            filteredResults.push(item);
          }
        }
        this.$refs.results.classList.add('active');
        this.filteredResults = filteredResults;
      }
    },

    isCurrent(element) {
      const index = window.location.pathname;
      const test = (index.indexOf(element) > -1);
      console.log(test);
      return test;
    }
  }
}
