<template>
  <div
    class="belk-search"
    :count="count"
    :state="state"
    v-bind:class="{ active: isActive, focused: isFocused }"
  >
    <!-- Input -->
    <div class="search-input">
      <input
        ref="input"
        type="text"
        v-on:keyup="keyupHandler"
        v-on:keyup.enter="doSearch"
        v-on:keyup.esc="forceBlur"
        :placeholder="placeholder"
        @focus="isFocused = true"
      />
      <button ref="clear" v-if="valueLength>0" v-hammer:tap="clearSearch">
        <i class="material-icons-round">close</i>
      </button>
      <button ref="search" v-hammer:tap="doSearch">
        <i class="material-icons-round">search</i>
      </button>
    </div>

    <div class="search-results">
      <div ref="noresults" v-bind:class="{ active: state == 3 }" class="search-noresults">
        <a :href="buildSearchLink(searchValue)">{{ searchValue }}</a>
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

      <div ref="actual" v-bind:class="{ 'active': count>0 }" class="search-suggestions">
        <div class="keywords">
          <ul>
            <li>
              <a :href="buildSearchLink(searchValue)">{{ searchValue }}</a>
            </li>
            <li
              v-for="item in suggestionsLimited"
              v-bind:key="item.id"
              @mouseover="suggestionHoverHandler(item.q)"
              v-bind:class="{ highlight: item.highlighted }"
            >
              <a :href="buildSearchLink(item.q)">{{ item.q }}</a>
            </li>
          </ul>
        </div>

        <div class="products">
          <div class="heading">Popular in "{{ searchValue }}"</div>
          <component
            ref="suggestedProducts"
            v-bind:is="belkProducts"
            v-bind:product-array="products"
            variant="secondary"
            :limit="3"
          ></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BelkProducts from "../belk-products/BelkProducts";

export default {
  name: "BelkSearch",

  data() {
    return {
      value: "",
      searchValue: "",
      valueLength: 0,
      triggerResults: 1,
      placeholder: "Search",
      noResults: false,
      isFocused: false,
      inputEl: {},
      resultsEl: {},
      products: [],
      productsLimited: [],
      productsLimit: 3,
      suggestions: [],
      suggestionsLimited: [],
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
      if (
        this.count == 0 &&
        this.noResults &&
        this.searchValue != "" &&
        this.isFocused
      )
        state = 3;
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
    },

    value(val) {
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

    suggestions(val) {
      if (val.length) {
        this.suggestionsLimited = val.slice(0, this.suggestionsLimit);
        this.suggestionsLimited[0].highlighted = true;
        let currentValueExists = false;
        for (let x = 0, l = val.length; x < l; x++) {
          if (val[x].q.toLowerCase() == this.searchValue.toLowerCase()) {
            currentValueExists = x;
            break;
          }
        }
        if (currentValueExists >= 0)
          this.suggestionsLimited.splice(currentValueExists, 1);
      } else {
        this.suggestionsLimited = [];
      }
    }
  },

  mounted() {
    this.inputEl = this.$refs.input;
    this.resultsEl = this.$refs.results;
    this.productsEl = this.$refs.suggestedProducts;

    this.recentSearches();

    if (location.params) {
      let query = location.params.q;
      if (query) this.fillSearch(query);
    }
  },

  methods: {
    events() {
      let self = this;
      document.addEventListener("click", e => {
        if ( !self.$el ||self.elementContains(self.$el, e.target) ) {
          return;
        }

        self.isFocused = false;
      });
    },

    keyupHandler() {
      this.value = this.inputEl.value;
      let len = this.value.length;

      if (len >= this.triggerResults) {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.doRequest, 200);
      } else {
        this.count = 0;
      }
    },

    clearSearch() {
      this.inputEl.value = "";
      this.value = "";
      this.searchValue = "";
      this.response = { response: {} };
      this.inputEl.focus();
    },

    doRequest() {
      let self = this;
      let xhr = new XMLHttpRequest();
      let value = this.inputEl.value;
      let url = `https://brm-suggest-0.brsrvr.com/api/v1/suggest/?account_id=6082&auth_key=&domain_key=belk&request_type=suggest&q=${value}`;
      xhr.open("GET", url);
      xhr.send(null);
      xhr.onreadystatechange = function() {
        let DONE = 4;
        let OK = 200;
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            let res = JSON.parse(xhr.responseText);
            self.searchValue = value;
            self.response = res;
          }
        }
      };
    },

    close() {
      this.inputEl.blur();
      this.setState(0);
    },

    recentSearches(val) {
      let rec = this.getItem("recentSearches") || [];
      if (val) {
        let exists = rec.indexOf(val);
        if (exists > -1) rec.splice(exists, 1);
        rec.unshift(val);
        if (rec.length > 10) rec = rec.slice(0, 10);
        this.setItem("recentSearches", rec);
      }
      this.recentCount = rec.length;
      this.recents = rec;
    },

    clearRecentSearches() {
      this.recents = [];
      this.setItem("recentSearches", []);
    },

    doSearch(e) {
      let val = e.target.value || this.inputEl.value;
      if (val.length > 0) {
        this.recentSearches(val);
        let url = `https://www.belk.com/search/?q=${val}&lang=default`;
        window.location.href = url;
      }
    },

    fillSearch(val, doSearch) {
      this.inputEl.value = val;
      if (doSearch) this.doRequest();
    },

    buildSearchLink(q) {
      return `https://www.belk.com/search/?q=${q}&lang=default`;
    },

    suggestionHoverHandler(val) {
      return val;
    },

    showSuggestedProducts(which = 0) {
      return which;
    },

    format(price) {
      let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
      });

      return formatter.format(price);
    }
  }
};
</script>
<style lang="scss" src="./style/default.scss"></style>
