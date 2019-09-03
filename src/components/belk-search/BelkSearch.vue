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
        autocomplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-haspopup="true"
        :aria-owns="ariaIDResults"
        :aria-expanded="isActive"
        :aria-activedescendant="activeDescendant"
        v-on:keyup="keyupHandler"
        v-on:keydown="keydownHandler"
        v-on:keyup.enter="doSearch"
        v-on:keydown.esc="forceBlur"
        v-on:keydown.tab="forceBlur"
        v-on:keydown.down="highlightHandler"
        v-on:keydown.up="highlightHandler"
        :placeholder="placeholder"
        @focus="focusHandler"/>
      <button aria-role="button" aria-label="clear search field" ref="clear" v-if="valueLength>0" v-hammer:tap="forceBlur">
        <belk-icon name="close" width="24">Clear Input</belk-icon>
      </button>
      <button aria-role="button" aria-label="perform search" ref="search" v-hammer:tap="doSearch">
        <belk-icon name="search" width="24">Perform Search Action</belk-icon>
      </button>
    </div>
    <div ref="loading" class="search-loading">
      <div class="loading-bar"></div>
    </div>
    <div class="search-results" :id="ariaIDResults" :aria-label="ariaListLabel">
      <!-- <div ref="noresults" v-bind:class="{ active: state == 3 }" class="search-noresults">
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
      </div> -->

      <div ref="recent" v-bind:class="{ active: state == 1 }" class="search-recent">
        <div class="flex space-between align-center">
          <div class="heading">Recent Searches</div>
          <div>
            <sh-button v-hammer:tap="clearRecentSearches">Clear</sh-button>
          </div>
        </div>
        <ul>
          <li v-for="item in recents" v-bind:key="item.id"
            v-bind:class="{ highlight: item.highlighted }"
            role="option"
            :id="item.id"
            :aria-selected="item.highlighted">
            <a :href="buildSearchLink(item.q)">{{ item.q }}</a>
          </li>
        </ul>
      </div>

      <div ref="actual" v-bind:class="{ active: state == 2 || state == 3 }" class="search-suggestions">
        <div class="keywords">
          <ul>
            <li v-for="(item, index) in suggestionsLimited"
              v-bind:key="item.id"
              v-bind:class="{ highlight: item.highlighted }"
              role="option"
              :id="item.id"
              :aria-selected="item.highlighted"
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
            v-bind:product-array="productsLimited"
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
      lowerPlaceholder: 'Search',
      upperPlaceholder: 'What can we help you find?',
      placeholder: '',
      valueLength: 0,
      triggerResults: 1,
      highlightIndex: -1,
      noResults: false,
      isFocused: false,
      inputEl: {},
      ignoreKeys: [37,39,91,16,13],
      navKeys: [38,40],
      resultsEl: {},
      ariaIDResults: '',
      activeDescendant: false,
      allProducts: [],
      products: [],
      productsLimited: [],
      productsLimit: 3,
      suggestTerm: '',
      suggestions: [],
      suggestionsLimited: [],
      previousSuggestions: [],
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
      this.activeDescendantHandler();
      return state;
    },

    ariaListLabel() {
      let label;
      switch(this.state) {
        case 3:
        case 2:
          label = 'Suggested Keywords';
          break
        case 1:
          label = 'Recent Searches';
          break
        case 0:
          label = this.placeholder;
          break
      }
      return label;
    }
  },

  watch: {
    response(val) {
      if (val.response.suggestions) {
        this.suggestions = val.response.suggestions;
        this.products = val.response.products || {};
        this.suggestTerm = this.searchValue;

        this.count = this.suggestions.length || 0;
        if (this.count == 0) {
          this.noResults = true;
        } else {
          this.noResults = false;
        }
      }
    },

    highlightIndex(val, oldVal) {
      switch(this.state) {
        case 2: // suggested keywords and products
          if (this.suggestionsLimited[oldVal]) this.$set(this.suggestionsLimited[oldVal], 'highlighted', false);
          this.$set(this.suggestionsLimited[val], 'highlighted', true);
          this.$emit('active-descendant', this.suggestionsLimited[val].id);
          this.showSuggestedProducts(val);
          this.value = this.suggestionsLimited[val].q;
          break;
        case 1:
          this.removeHighlight(this.recents);
          this.$set(this.recents[val], 'highlighted', true);
          this.$emit('active-descendant', this.recents[val].id);
          this.value = this.recents[val].q;
        break;
      }
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
      if (val && val.length) {
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
          val[x].id = `suggestion-${x}`
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
          let obj = { q: this.searchValue, highlighted: true, id: 'filled-0' };
          arr.unshift(obj);
          if (arr.length > this.suggestionsLimit) arr.pop();
          highlight = 0;
          this.$emit('active-descendant', 'filled-0')
        } else {
          arr[currentValueExists].highlighted = true;
          highlight = currentValueExists;
          this.$emit('active-descendant', arr[currentValueExists].id)
        }
      }

      this.$set(this, 'suggestionsLimited', arr);
      this.getAllProducts(arr);
      if (arr.length) this.$set(this, 'previousSuggestions', arr);
      this.highlightIndex = highlight || 0;
    }
  },

  created() {
    this.setUUID();
  },

  mounted() {
    this.inputEl = this.$refs.input;
    this.resultsEl = this.$refs.results;
    this.productsEl = this.$refs.suggestedProducts;
    this.configureAria();
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

      window.addEventListener('resize', self.placeholderHandler);

      this.$on('active-descendant', self.activeDescendantHandler)
    },

    configureAria() {
      this.ariaIDResults = `res-${this.uuid}`;
    },

    activeDescendantHandler(id) {
      this.activeDescendant = (id) ? id : false;
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

    removeHighlight(arr) {
      for (let x = 0, l = arr.length; x < l; x++) {
        if (arr[x].highlighted) this.$set(arr[x], 'highlighted', false);
      }
    },

    highlightHandler(e) {
      let length;
      let choose;
      let key = e.charCode || e.keyCode;
      let which = this.highlightIndex;

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

      switch (this.state) {
        case 2:
          length = this.suggestionsLimited.length;
          break;
        case 1:
          length = this.recents.length;
          break;
      }
        

      which += choose;
      if (which >= length) which = 0;
      if (which < 0) which = length - 1;

      this.highlightIndex = which;
    },

    forceBlur(e) {
      let key = e.charCode || e.keyCode;
      let clear = false;
      if (key == 27 || e.target == this.$refs.clear) clear = true;
      if (document.activeElement == this.inputEl) this.inputEl.blur();
      this.isFocused = false;

      if (clear) this.clearSearch(false);
    },

    clearSearch(focus = true) {
      this.inputEl.value = '';
      this.value = '';
      this.searchValue = '';
      this.response = { response: {} };
      if (focus) setTimeout(() => { this.inputEl.focus()});
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

      let arr = [];
      for (let x = 0, l = rec.length; x < l; x++) {
        arr.push({
          q: rec[x],
          highlighted: false,
          id: `recommended-${x}`
        })
      }
      this.recents = arr;
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
        this.forceBlur(true);
      } else {
        this.inputEl.focus();
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
              self.$set(self.allProducts[which], 'products', arr);
              let event = `products-loaded.${which}`;
              self.$emit(event, arr);
            }
          }
        };
      }

      let length = arr.length;
      self.allProducts = [];
      for (let x = 0, l = length; x < l; x++) {
        self.allProducts[x] = { products: false };
        doReq(x);
      }
    },

    suggestionHoverHandler(val) {
      this.showSuggestedProducts(val);
    },

    showSuggestedProducts(which = 0) {
      this.suggestTerm = this.suggestionsLimited[which].q;
      if (typeof this.allProducts[which] == "undefined") {
        this.$once(`products-loaded.${which}`, (arr) => {
          this.products = arr;
        });
      } else {
        if (this.allProducts[which]) this.products = this.allProducts[which].products;
      }
    }
  }
};
</script>