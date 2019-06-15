import { EventBus } from '../../event-bus.js';

export default {
  name: 'Nav',
  data() {
    return {
      search: "",
      results: [],
      filteredResults: [],
    }
  },
  mounted() {
    this.events();
    this.buildSearchResults();
  },
  methods: {
    events() {
      let self = this;
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
            if (document.activeElement != self.$refs.search) self.$refs.search.focus();
          }
        });
      }
      
      EventBus.$on('nav-closed', this.navToggledHandler);
      EventBus.$on('nav-toggled', this.navToggledHandler);
    },

    closeNav() {
      EventBus.$emit('close-nav');
    },

    buildSearchResults() {
      let links = this.$refs.secondary.querySelectorAll('a');
      let results = [];
      for (let x = 0, l = links.length; x < l; x++) {
        let link = links[x];
        results.push({
          'link': link.href,
          'name': link.innerText,
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
          let item = this.results[x];
          let name = item.name.toLowerCase()
          let match = name.indexOf(value) >= 0;
          console.log(name, value, match)
          if (match) {
            item.show = true;
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