<template>
  <div
    class="belk-search"
    :count="count"
    :state="state"
    v-bind:class="{ active: isActive, focused: isFocused }">
    <!-- Input -->
    <div class="search-input">
      <input
        ref="input"
        type="text"
        v-on:keyup="keyupHandler"
        v-on:keydown="keydownHandler"
        v-on:keyup.enter="doSearch"
        v-on:keydown.esc="forceBlur"
        v-on:keydown.tab="forceBlur"
        v-on:keydown.down="highlightHandler"
        v-on:keydown.up="highlightHandler"
        :placeholder="placeholder"
        @focus="focusHandler"/>
      <button ref="clear" v-if="valueLength>0" v-hammer:tap="clearSearch">
        <i class="material-icons-round">close</i>
      </button>
      <button ref="search" v-hammer:tap="doSearch">
        <i class="material-icons-round">search</i>
      </button>
    </div>
    <div ref="loading" class="search-loading">
      <div class="loading-bar"></div>
    </div>
    <div class="search-results">
      <div ref="noresults" v-bind:class="{ active: state == 3 }" class="search-noresults">
        <ul>
          <li>
            <a :href="buildSearchLink(searchValue)">{{ searchValue }}</a>
          </li>
            <li
              v-for="(item, index) in previousSuggestions"
              v-bind:key="item.id"
              v-bind:class="{ highlight: item.highlighted }"
              @mouseover="suggestionHoverHandler(index)">
              <a :href="buildSearchLink(item.q)" v-html="emphasizeText(item.q)"></a>
            </li>
          </ul>
      </div>

      <div ref="recent" v-bind:class="{ active: state == 1 }" class="search-recent">
        <div class="flex space-between align-center">
          <div class="heading">Recent Searches</div>
          <div>
            <sh-button v-hammer:tap="clearRecentSearches">Clear</sh-button>
          </div>
        </div>
        <ul>
          <li v-for="item in recents" v-bind:key="item.id">
            <a :href="buildSearchLink(item)">{{ item }}</a>
          </li>
        </ul>
      </div>

      <div ref="actual" v-bind:class="{ active: state == 2 }" class="search-suggestions">
        <div class="keywords">
          <ul>
            <li
              v-for="(item, index) in suggestionsLimited"
              v-bind:key="item.id"
              v-bind:class="{ highlight: item.highlighted }"
              @mouseover="suggestionHoverHandler(index)">
              <a :href="buildSearchLink(item.q)" v-html="emphasizeText(item.q)"></a>
            </li>
          </ul>
        </div>

        <div class="products">
          <div class="heading">Popular in "{{ suggestTerm }}"</div>
          <component
            ref="suggestedProducts"
            v-bind:is="belkProducts"
            v-bind:product-array="products"
            variant="secondary"
            :limit="3"
          ></component>
          <a class="view-more" :href="buildSearchLink(suggestTerm)">View more results for "{{ suggestTerm }}"</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./style/default.scss"></style>

<script>
import BelkProducts from "../belk-products/BelkProducts";

export default {
  name: "BelkSearch",

  data() {
    return {
      value: '',
      searchValue: '',
      lowerPlaceholder: 'Lower Placeholder',
      upperPlaceholder: 'Upper Placeholder',
      placeholder: '',
      valueLength: 0,
      triggerResults: 1,
      highlightIndex: 0,
      noResults: false,
      isFocused: false,
      inputEl: {},
      ignoreKeys: [37,39,91,16,13],
      navKeys: [38,40],
      resultsEl: {},
      allProducts: [],
      products: [],
      productsLimited: [],
      productsLimit: 3,
      suggestions: [],
      suggestionsLimited: [],
      previousSuggestions: [],
      suggestTerm: '',
      suggestionsLimit: 10,
      recents: [],
      recentCount: 0,
      valueLenth: 0,
      timer: null,
      response: {},
      count: 0,
      preloaded: false,
      fullyloaded: false,
      belkProducts: BelkProducts
    };
  },

  computed: {
    isActive() {
      let active = this.state > 0;
      return active;
    },

    state() {
      let state = 0;
      if (this.recents.length && this.count == 0 && this.isFocused) state = 1;
      if (this.count > 0 && this.isFocused) state = 2;
      if (this.count == 0 && this.noResults && this.searchValue != "" && this.isFocused) state = 3;

      return state;
    }
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

      this.getAllProducts(this.suggestions);
    },

    highlightIndex(val, oldVal) {
      this.$set(this.suggestionsLimited[oldVal], 'highlighted', false);
      this.$set(this.suggestionsLimited[val], 'highlighted', true);
      this.showSuggestedProducts(val);
      this.value = this.suggestionsLimited[val].q;
      // this.selectInput();
    },

    value(val) {
      if (this.inputEl.value != val) this.inputEl.value = val;
      this.valueLength = val.length;
    },

    recents(arr) {
      this.recentCount = arr.length;
    },

    products(val) {
      if (val.length) {
        this.productsLimited = val.slice(0, this.productsLimit);
      } else {
        this.productsLimited = [];
      }
      this.productsEl.products = this.productsLimited;
    },

    suggestions(val, old) {
      if (val == old) return;
      let length = val.length;
      let arr = [];
      let highlight;
      let searchVal = this.searchValue.toLowerCase().trim();

      if (length) {
        for (let x = 0, l = Math.min(length, this.suggestionsLimit); x < l; x++) {
          arr.push(val[x]);
        }

        let currentValueExists = -1;

        for (let x = 0, l = arr.length; x < l; x++) {
          let arrVal = arr[x].q.toLowerCase();
          let match = (arrVal === searchVal);
          if (match) {
            currentValueExists = x;
            break;
          }
        }

        if (currentValueExists < 0) {
          let obj = { q: this.searchValue, highlighted: true };
          arr.unshift(obj);
          if (arr.length > this.suggestionsLimit) arr.pop();
          highlight = 0;
        } else {
          arr[currentValueExists].highlighted = true;
          highlight = currentValueExists;
        }
      }

      this.$set(this, 'suggestionsLimited', arr);
      if (arr.length) this.$set(this, 'previousSuggestions', arr);
      this.highlightIndex = highlight || 0;
    }
  },

  mounted() {
    this.inputEl = this.$refs.input;
    this.resultsEl = this.$refs.results;
    this.productsEl = this.$refs.suggestedProducts;
    this.placeholderHandler();
    this.recentSearches();

    if (location.params) {
      let query = location.params.q;
      if (query) this.fillSearch(query);
    }
  },

  methods: {
    events() {
      let self = this;
      document.addEventListener('click', e => {
        if ( !self.$el || self.elementContains(self.$el, e.target) ) return;
        self.isFocused = false;
      });

      window.addEventListener('resize', self.placeholderHandler)
    },

    keydownHandler(e) {
      let key = e.charCode || e.keyCode;
      let nav = this.navKeys.indexOf(key) >= 0; // up/down arrows
      let ignore = this.ignoreKeys.indexOf(key) >= 0; // left/right arrows, enter
      if (ignore || nav) {
        if (nav) e.preventDefault();
        return;
      }
    },

    keyupHandler(e) {
      let key = e.charCode || e.keyCode;
      let nav = this.navKeys.indexOf(key) >= 0; // up/down arrows
      let ignore = this.ignoreKeys.indexOf(key) >= 0; // left/right arrows
      if (ignore || nav) {
        if (nav) e.preventDefault();
        return;
      }

      this.value = this.inputEl.value;
      let len = this.value.length;

      if (len >= this.triggerResults) {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.doRequest, 200);
      } else {
        this.count = 0;
      }
    },

    focusHandler() {
      this.isFocused = true;
      this.selectInput();
    },

    placeholderHandler() {
      let self = this;
      clearTimeout(self._placeholderTimer);
      self._placeholderTimer = setTimeout(() => {
        let text = (window.innerWidth < 768) ? this.lowerPlaceholder : this.upperPlaceholder;
        self.placeholder = text;
      }, 100);
    },

    selectInput() {
      let self = this;
      setTimeout( function() {
        self.inputEl.setSelectionRange(0, self.value.length);
      }, 10)
    },

    highlightHandler(e) {
      let length = this.suggestionsLimited.length;
      let choose;
      let key = e.charCode || e.keyCode;

      switch(key) {
        case 38:
          choose = -1;
          break;
        case 40:
          choose = 1;
          break;
        default:
          choose = 0;
          break;
      }

      let which = this.highlightIndex;
      which += choose;
      if (which >= length) which = 0;
      if (which < 0) which = length - 1;

      this.highlightIndex = which;
    },

    forceBlur() {
      if (document.activeElement == this.inputEl) this.inputEl.blur();
      this.isFocused = false;
    },

    clearSearch() {
      this.inputEl.value = '';
      this.value = '';
      this.searchValue = '';
      this.response = { response: {} };
      setTimeout(() => { this.inputEl.focus()});
    },

    doRequest() {
      let self = this;
      let xhr = new XMLHttpRequest();
      let value = this.inputEl.value;
      let url = this.buildBloomreachURL(value);
      xhr.open('GET', url);
      xhr.send(null);
      xhr.onreadystatechange = function() {
        let DONE = 4;
        let OK = 200;
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            let res = JSON.parse(xhr.responseText);
            self.searchValue = value.trim();
            self.response = res;
          }
        }
      };
    },

    buildBloomreachURL(val) {
      let url = `https://brm-suggest-0.brsrvr.com/api/v1/suggest/?account_id=6082&auth_key=&domain_key=belk&request_type=suggest&q=${val}`;
      return url
    },

    recentSearches(val) {
      let rec = this.getItem('recentSearches') || [];
      if (val) {
        let exists = rec.indexOf(val);
        if (exists > -1) rec.splice(exists, 1);
        rec.unshift(val);
        if (rec.length > 10) rec = rec.slice(0, 10);
        this.setItem('recentSearches', rec);
      }
      this.recentCount = rec.length;
      this.recents = rec;
    },

    clearRecentSearches() {
      this.recents = [];
      this.setItem('recentSearches', []);
    },

    doSearch(e) {
      let val = e.target.value || this.value;
      if (val.length > 0) {
        this.recentSearches(val);
        let url = this.buildSearchLink(val);
        window.location.href = url;
        this.state = 0;
      }
    },

    fillSearch(val, doSearch) {
      this.value = val;
      if (doSearch) setTimeout(this.doRequest, 10);
    },

    emphasizeText(text) {
      let val = this.searchValue.trim();
      let arr = text.split(val);
      if (arr.length > 1) arr.splice(1, 0, `<span class="bold">${val}</span>`);
      return arr.join('');
    },

    buildSearchLink(q) {
      return `https://www.belk.com/search/?q=${q}&lang=default`;
    },

    getAllProducts(arr) {
      let self = this;

      function doReq(which) {
        let xhr = new XMLHttpRequest();
        let value = arr[which].q;
        let url = self.buildBloomreachURL(value);
        xhr.open('GET', url);
        xhr.send(null);
        xhr.onreadystatechange = function() {
          let DONE = 4;
          let OK = 200;
          if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
              let res = JSON.parse(xhr.responseText);
              let arr = res.response.products;
              arr = arr.splice(0, Math.min(arr.length, self.productsLimit))
              self.$set(self.allProducts[which], 'products', res.response.products);
            }
          }
        };
      }


      let length = arr.length;
      this.allProducts = [];
      for (let x = 0, l = length; x < l; x++) {
        this.allProducts[x] = {};
        doReq(x);
      }
    },

    suggestionHoverHandler(val) {
      this.showSuggestedProducts(val);
    },

    showSuggestedProducts(which = 0) {
      this.suggestTerm = this.suggestionsLimited[which].q;
      this.products = this.allProducts[which].products;
    }
  }
};
</script>