export default {
  name: 'Nav',
  
  data() {
    return {
      search: '',
      results: [],
      filteredResults: [],
    }
  },

  mounted() {
    this.buildSearchResults();
    setTimeout( function() {
      document.body.classList.add('ready');
    });
  },

  methods: {
    events() {
      let self = this;

      self.$bus.$on('hashchange', this.closeNav)

      let links = this.$el.querySelectorAll('a[href^="#"]');
      for (let x = 0, l = links.length; x < l; x++) {
        let link = links[x];
        link.addEventListener('click', (e) => {
          e.preventDefault();
        });

        link.addEventListener('mouseover', () => {
          this.navToggledHandler();
          link.classList.add('active');
          let target = link.getAttribute('href');
          let targetEl = self.$el.querySelector(target);
          if (targetEl) targetEl.classList.add('active');
        });

        window.addEventListener('keydown', (e) => {
          if (document.documentElement.classList.contains('nav-shown')) {
            let key = e.keyCode;
            if (key == 192) {
              e.preventDefault();
              return;
            }
            if (document.activeElement != self.$refs.search && key != 9) self.$refs.search.focus();
          }
        });
      }
      
      this.$bus.$on('nav-closed', this.navToggledHandler);
      this.$bus.$on('nav-toggled', this.navToggledHandler);
    },

    closeNav() {
      this.$bus.$emit('close-nav');
    },

    buildSearchResults() {
      let links = this.$refs.secondary.querySelectorAll('a');
      let results = [];
      for (let x = 0, l = links.length; x < l; x++) {
        let link = links[x];
        results.push({
          'link': link.href,
          'name': link.innerText,
          'reset': link.innerText,
          'category': link.closest('div').id,
          'show': false
        })
      }
      this.results = results;
    },

      /* eslint-disable */
    doSearch(e) {
      let value = this.search;
      if (value == "") {
        this.filteredResults = [];
      } else {
        let filteredResults = [];
        for (let x = 0, l = this.results.length; x < l; x++) {
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
      if (document.activeElement == this.$refs.search) this.$refs.search.blur();
    },

    clearSecondaries() {
      let others = this.$el.querySelectorAll('.active');
      if (others) {
        for (let y = 0, m = others.length; y < m; y++) {
          others[y].classList.remove('active');
        }
      }
    }
  }
}