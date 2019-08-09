export default {
  name: 'BelkSearch',

  data() {
    return {
      value: '',
      valueLength: 0,
      triggerResults: 3,
      placeholder: 'Search',
      noResults: false,
      isFocused: false,
      inputEl: {},
      resultsEl: {},
      products: {},
      suggestions: {},
      recents: [],
      recentCount: 0,
      valueLenth: 0,
      _timer: null,
      response: {},
      count: 0,
      preloaded: false,
      fullyloaded: false
    };
  },

  watch: {
    response(val) {
      this.suggestions = val.response.suggestions || {};
      this.products = val.response.products || {};
      this.count = this.suggestions.length || 0;
      if (this.count == 0) {
        this.noResults = true;
      } else {
        this.noResults = false;
      }
    },

    recents(arr) {
      this.recentCount = arr.length;
    }
  },

  mounted() {
    this.inputEl = this.$refs.input;
    this.resultsEl = this.$refs.results;
    this.recentSearches();
    if (location.params) {
      let query = location.params.q;
      if (query) this.fillSearch(query);
    }
  },

  methods: {
    keyupHandler() {
      this.value = this.inputEl.value;
      let len = this.value.length;
      this.valueLength = len;

      if (len >= this.triggerResults) {
        clearTimeout(this._timer);
        this._timer = setTimeout(this.doRequest, 200);
      } else {
        this.count = 0;
      }
    },

    clearSearch() {
      this.inputEl.value = '';
      this.searchValue = '';
      this.response = { response: {} }
    },

    doRequest() {
      let self = this;
      let xhr = new XMLHttpRequest();
      let value = this.inputEl.value;
      this.searchValue = value;
      let url = `https://brm-suggest-0.brsrvr.com/api/v1/suggest/?account_id=6082&auth_key=&domain_key=belk&request_type=suggest&q=${value}`;
      xhr.open('GET', url);
      xhr.send(null);

      xhr.onreadystatechange = function () {
        let DONE = 4;
        let OK = 200;
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) self.response = JSON.parse(xhr.responseText);
        }
      }
    },

    recentSearches(val) {
      let recents = this.getItem('recentSearches') || [];
      if (val) {
        let exists = recents.indexOf(val);
        if (exists > -1) recents.splice(exists, 1);
        recents.unshift(val);
        if (recents.length > 10) recents = recents.slice(0, 10);
        this.setItem('recentSearches', recents);
      }
      this.recentCount = recents.length;
      this.recents = recents;
    },

    clearRecentSearches() {
      this.recents = [];
      this.setItem('recentSearches', []);
    },

    doSearch() {
      let val = this.inputEl.value;
      this.recentSearches(val);
      // let url = `https://www.belk.com/search/?q=${val}&lang=default`;
      // window.location.href = url;
    },

    fillSearch(val, doSearch) {
      this.inputEl.value = val;
      if (doSearch) this.doRequest();
    },

    suggestionHoverHandler(val) {
      return val
    },

    showSuggestedProducts(which = 0) {
      return which
    }
  },

};
