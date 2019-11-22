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
    items() {
      this.handleActive();
    },
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

      self.$bus.$on('hashchange', this.closeNav);

      const links = this.$el.querySelectorAll('a[href^="#"]');
      for (let x = 0, l = links.length; x < l; x += 1) {
        const link = links[x];
        link.addEventListener('click', (e) => {
          e.preventDefault();
        });

        link.addEventListener('mouseover', () => {
          this.navToggledHandler();
          link.classList.add('active');
          const target = link.getAttribute('href');
          const targetEl = self.$el.querySelector(target);
          if (targetEl) targetEl.classList.add('active');
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
      }

      this.$bus.$on('nav-closed', this.navToggledHandler);
      this.$bus.$on('nav-toggled', this.navToggledHandler);
    },

    handleActive() {
      const activePage = window.location.pathname.split('/').pop();
      const activeEl = document.querySelector(`[href$="${activePage}"]`);
      if (activeEl) activeEl.classList.add('active');
    },

    toggleNav() {
      this.navShown = !this.navShown;
    },

    closeNav() {
      this.$bus.$emit('close-nav');
    },

    buildSearchResults() {
      const links = this.$refs.secondary.querySelectorAll('a');
      const results = [];
      for (let x = 0, l = links.length; x < l; x += 1) {
        const link = links[x];
        results.push({
          link: link.href,
          name: link.innerText,
          reset: link.innerText,
          category: link.closest('div').id,
          show: false,
        });
      }
      this.results = results;
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
        this.clearSecondaries();
        this.$refs.results.classList.add('active');
        this.filteredResults = filteredResults;
      }
    },

    navToggledHandler() {
      this.clearSecondaries();
      this.search = "";
      if (document.activeElement === this.$refs.search) this.$refs.search.blur();
    },

    clearSecondaries() {
      let others = this.$el.querySelectorAll('.active');
      if (others) {
        for (let y = 0, m = others.length; y < m; y += 1) {
          others[y].classList.remove('active');
        }
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