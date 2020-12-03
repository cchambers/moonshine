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
      <button class="clear-search" aria-role="button"
        aria-label="clear search field"
        ref="clear"
        v-if="valueLength>0"
        v-hammer:tap="forceBlur">
        <belk-icon name="close" width="24">Clear Input</belk-icon>
      </button>
      <button aria-role="button"
        aria-label="perform search"
        ref="search"
        v-hammer:tap="doSearch">
        <belk-icon name="search" width="24">Perform Search Action</belk-icon>
      </button>
    </div>
    <div ref="loading" class="search-loading">
      <div class="loading-bar"></div>
    </div>
    <div class="search-results"
        :id="ariaIDResults"
        :aria-label="ariaListLabel">
      <div ref="noresults" v-bind:class="{ active: state === 3 }" class="search-noresults">
        <ul>
          <li>
            <a :href="buildSearchLink(value)">{{ value }}</a>
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

      <div ref="recent"
        v-bind:class="{ active: state === 1 }"
        class="search-recent"
        @touchstart="blurInputMobile">
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

      <div ref="actual"
        v-bind:class="{ active: state === 2 || state === 3 }"
        class="search-suggestions"
        @touchstart="blurInputMobile()" >
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
            v-bind:is="belkProductList"
            v-bind:product-array="productsLimited"
            variant="secondary"
            :item-limit="3"
          ></component>
          <a class="view-more" :href="buildSearchLink(suggestTerm)">
            View more results for "{{ suggestTerm }}"
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/variant-modal.scss"></style>

<script>
import BelkProductList from '../../belk-product-list/vue/BelkProductList.vue';
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkSearch',

  props: {
    variant: {
      type: String,
      default: 'default',
    },
    debug: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      value: '',
      searchValue: '',
      placeholder: 'Search',
      valueLength: 0,
      triggerResults: 1,
      highlightIndex: -1,
      noResults: false,
      filled: false,
      isFocused: false,
      id: '',
      inputEl: {},
      ignoreKeys: [37, 39, 91, 16, 13],
      navKeys: [38, 40],
      resultsEl: {},
      ariaIDResults: '',
      activeDescendant: false,
      allProducts: [],
      headerEl: false,
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
      belkProductList: BelkProductList,
    };
  },

  computed: {
    isActive() {
      const active = this.state > 0;
      return active;
    },

    state() {
      let state = 0;
      if (this.recents.length && this.count === 0 && this.isFocused) state = 1;
      if (this.count > 0 && this.isFocused) state = 2;
      if (this.count === 0 && this.noResults && this.searchValue !== '' && this.isFocused) state = 1; // was 3
      this.activeDescendantHandler();
      this.stateHandler(state);
      // eslint-disable-next-line
      if (this.debug) this.log(`ct: ${this.count}, nr: ${this.noResults}, sv: ${this.searchValue}, foc: ${this.isFocused}, st: ${state}`);
      return state;
    },

    ariaListLabel() {
      let label;
      switch (this.state) {
        case 3:
        case 2:
          label = 'Suggested Keywords';
          break;
        case 1:
          label = 'Recent Searches';
          break;
        case 0:
        default:
          label = this.placeholder;
          break;
      }
      return label;
    },
  },

  watch: {
    response(val) {
      const self = this;
      if (val.response.suggestions) {
        self.suggestions = val.response.suggestions || [];
        self.products = val.response.products || [];
        self.suggestTerm = self.searchValue;
        self.$bus.$emit('search-term', {
          el: self.uuid,
          term: val.response.q || '',
        });
        self.count = self.suggestions.length || 0;
        if (self.count === 0) {
          self.noResults = true;
        } else {
          self.noResults = false;
        }
      }
    },

    highlightIndex(val, oldVal) {
      switch (this.state) {
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
        default:
          break;
      }
      // this.selectInput();
    },

    value(val) {
      if (this.inputEl.value !== val) this.inputEl.value = val;
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
      const value = val;
      if (value === old) return;
      const { length } = val;
      const arr = [];
      let highlight;
      const searchVal = this.searchValue.toLowerCase().trim();

      if (length) {
        for (let x = 0, l = Math.min(length, this.suggestionsLimit); x < l; x += 1) {
          value[x].id = `suggestion-${x}`;
          arr.push(value[x]);
        }

        let currentValueExists = -1;

        for (let x = 0, l = arr.length; x < l; x += 1) {
          const arrVal = arr[x].q.toLowerCase();
          const match = (arrVal === searchVal);
          if (match) {
            currentValueExists = x;
            break;
          }
        }

        if (currentValueExists < 0) {
          const obj = { q: this.value, highlighted: true, id: 'filled-0' };
          this.filled = true;
          arr.unshift(obj);
          if (arr.length > this.suggestionsLimit) arr.pop();
          highlight = 0;
          this.$emit('active-descendant', 'filled-0');
        } else {
          this.filled = false;
          arr[currentValueExists].highlighted = true;
          highlight = currentValueExists;
          this.$emit('active-descendant', arr[currentValueExists].id);
        }
      }

      this.$set(this, 'suggestionsLimited', arr);
      this.getAllProducts(arr);
      if (arr.length) this.$set(this, 'previousSuggestions', arr);
      this.highlightIndex = highlight || 0;
    },
  },

  created() {
    this.setUUID();
  },

  mounted() {
    this.inputEl = this.$refs.input;
    this.resultsEl = this.$refs.results;
    this.productsEl = this.$refs.suggestedProducts;
    this.headerEl = document.querySelector('belk-header');
    this.configureAria();
    this.recentSearches();

    if (window.location.params) {
      const query = window.location.params.q;
      if (query) this.fillSearch(query);
    }
  },

  methods: {
    events() {
      const self = this;
      document.addEventListener('click', (e) => {
        if (!self.$el || self.elementContains(self.$el, e.target)) return;
        if (this.variant !== 'modal') self.isFocused = false;
      });

      self.$on('active-descendant', self.activeDescendantHandler);
      self.$bus.$on('popper-opening', self.forceBlur);
      self.$bus.$on('close-search', self.forceBlur);
      self.$bus.$on('search-term', self.searchTermHandler);

      if (this.variant === 'modal') {
        self.$bus.$on('focus-search', self.modalHandler);
      }
    },

    modalHandler() {
      this.selectInput();
    },

    searchTermHandler(data) {
      if (data.el === this.uuid) return;
      this.fillSearch(data.term, false);
    },

    stateHandler(val) {
      if (this.headerEl) {
        if (val > 0 || this.isFocused) {
          this.headerEl.classList.add('search-active');
        } else {
          this.headerEl.classList.remove('search-active');
        }
      }
    },

    configureAria() {
      this.ariaIDResults = `res-${this.uuid}`;
    },

    activeDescendantHandler(id) {
      this.activeDescendant = (id) || false;
    },

    keydownHandler(e) {
      const key = e.charCode || e.keyCode;
      const nav = this.navKeys.indexOf(key) >= 0; // up/down arrows
      const ignore = this.ignoreKeys.indexOf(key) >= 0; // left/right arrows, enter
      if (ignore || nav) {
        if (nav) e.preventDefault();
      }
    },

    keyupHandler(e) {
      const key = e.charCode || e.keyCode;
      const nav = this.navKeys.indexOf(key) >= 0; // up/down arrows
      const ignore = this.ignoreKeys.indexOf(key) >= 0; // left/right arrows
      if (ignore || nav) {
        if (nav) e.preventDefault();
        return;
      }

      this.value = this.inputEl.value;
      const len = this.value.length;

      if (len >= this.triggerResults) {
        clearTimeout(this.timer);
        this.timer = setTimeout(this.doRequest, 200);
      } else {
        this.count = 0;
      }
    },

    focusHandler() {
      this.isFocused = true;
    },

    triggerModalSearch() {
      window.location.hash = 'search-modal';
      this.$bus.$emit('focus-search', 'mobile-search');
    },

    selectInput() {
      const self = this;
      if (self.isMobile() && self.variant !== 'modal') {
        self.triggerModalSearch();
      } else {
        setTimeout(() => {
          self.inputEl.focus();
          self.inputEl.setSelectionRange(0, self.value.length);
        }, 10);
      }
    },

    removeHighlight(arr) {
      for (let x = 0, l = arr.length; x < l; x += 1) {
        if (arr[x].highlighted) this.$set(arr[x], 'highlighted', false);
      }
    },

    highlightHandler(e) {
      let length;
      let choose;
      const key = e.charCode || e.keyCode;
      let which = this.highlightIndex;

      switch (key) {
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
        default:
          break;
      }

      which += choose;
      if (which >= length) which = 0;
      if (which < 0) which = length - 1;

      this.highlightIndex = which;
    },

    forceBlur(e) {
      if (this.isFocused) {
        let clear = false;
        if (typeof e === 'object') {
          const key = e.charCode || e.keyCode;
          if (key === 27 || e.target === this.$refs.clear) clear = true;
        }
        if (document.activeElement === this.inputEl) this.inputEl.blur();
        this.isFocused = false;

        if (clear) this.clearSearch(clear);
      }
    },

    clearSearch(focus = true) {
      this.inputEl.value = '';
      this.value = '';
      this.searchValue = '';
      this.products = [];
      this.clearResponse();
      if (focus) setTimeout(() => { this.inputEl.focus(); });
    },

    clearResponse() {
      this.response = { response: { products: [], suggestions: [] } };
    },

    doRequest() {
      const self = this;
      const xhr = new XMLHttpRequest();
      const { value } = this.inputEl;
      const url = this.buildBloomreachURL(value);
      xhr.open('GET', url);
      xhr.send(null);
      xhr.onreadystatechange = () => {
        const DONE = 4;
        const OK = 200;
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            const res = JSON.parse(xhr.responseText);
            self.searchValue = value.trim();
            self.response = res;
          }
        }
      };
    },

    buildBloomreachURL(val) {
      const url = `https://brm-suggest-0.brsrvr.com/api/v1/suggest/?account_id=6082&auth_key=&domain_key=belk&request_type=suggest&q=${val}`;
      return url;
    },

    recentSearches(val) {
      let rec = this.getItem('recentSearches') || [];

      if (val) {
        const exists = rec.indexOf(val);
        if (exists > -1) rec.splice(exists, 1);
        rec.unshift(val);
        if (rec.length > 10) rec = rec.slice(0, 10);
        this.setItem('recentSearches', rec);
      }
      this.recentCount = rec.length;

      const arr = [];
      for (let x = 0, l = rec.length; x < l; x += 1) {
        arr.push({
          q: rec[x],
          highlighted: false,
          id: `recommended-${x}`,
        });
      }
      this.recents = arr;
    },

    clearRecentSearches() {
      this.recents = [];
      this.setItem('recentSearches', []);
    },

    doSearch(e) {
      const val = e.target.value || this.value;
      if (val.length > 0) {
        this.recentSearches(val);
        const url = this.buildSearchLink(val);
        window.location.href = url;
        this.forceBlur();
      } else {
        this.inputEl.focus();
      }
    },

    fillSearch(val, doSearch) {
      this.value = decodeURIComponent(val);
      if (doSearch) setTimeout(this.doRequest, 10);
    },

    emphasizeText(text) {
      let val = this.searchValue.trim();
      if (val) val = val.toLowerCase();
      const arr = text.split(val);
      if (arr.length > 1) arr.splice(1, 0, `<span class="bold">${val}</span>`);
      return arr.join('');
    },

    buildSearchLink(q) {
      const whref = window.location.href;
      const dev = (whref.indexOf('belk.demand') >= 0)
        || (whref.indexOf('belkdev') >= 0)
        || (whref.indexOf('localhost') >= 0);
      if (dev) return `${window.location.origin}/on/demandware.store/Sites-Belk-Site/default/Search-Show?q=${q}&lang=default`;
      return `${window.location.origin}/search/?q=${q}&lang=default`;
    },

    getAllProducts(arr) {
      const self = this;

      function doReq(which) {
        const xhr = new XMLHttpRequest();
        const value = arr[which].q;
        const url = self.buildBloomreachURL(value);
        xhr.open('GET', url);
        xhr.send(null);
        xhr.onreadystatechange = () => {
          const DONE = 4;
          const OK = 200;
          if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
              const res = JSON.parse(xhr.responseText);
              const array = res.response.products;
              self.$set(self.allProducts[which], 'products', array);
              const event = `products-loaded.${which}`;
              self.$emit(event, array);
            }
          }
        };
      }

      const { length } = arr;
      self.allProducts = [];
      for (let x = 0, l = length; x < l; x += 1) {
        self.allProducts[x] = { products: false };
        doReq(x);
      }
    },

    isMobile() {
      return window.matchMedia('(max-width: 768px)').matches;
    },

    suggestionHoverHandler(val) {
      this.showSuggestedProducts(val);
    },

    blurInputMobile() {
      setTimeout(() => {
        this.inputEl.blur();
      }, 100);
    },

    setupReceive(which) {
      const self = this;
      self.$once(`products-loaded.${which}`, (arr) => {
        self.products = arr;
        self.showSuggestedProducts(which);
      });
    },

    showSuggestedProducts(index = 0) {
      const self = this;
      let which = index;
      if (self.filled && which === 0) which = 1;
      self.suggestTerm = self.suggestionsLimited[which].q;
      if ((typeof self.allProducts[which] === 'undefined')) {
        self.setupReceive(which);
      } else if (self.allProducts[which]) {
        if (self.allProducts[which].products === false) {
          self.setupReceive(which);
        } else {
          self.$set(self, 'products', self.allProducts[which].products);
        }
      }
    },
  },
};
</script>
