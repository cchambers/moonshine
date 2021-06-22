<template>
  <nav class="belk-facet-nav"
    :variant="variant">
    <div class="filter-header">
      <div class="ha">Filters</div>
      <button v-if="Object.keys(selectedFilters).length"
        class="filter-clear"
        @click="clearFilters()">Clear All</button>
      <belk-icon @click="close" name="close" height="22" width="22"></belk-icon>
    </div>
    <div class="filter-stack">
      <template v-for="(thing, facet) in selectedFilters">
        <template v-for="filter in thing">
        <button
        v-bind:key="filter.index"
        @click="removeFilter(facet, filter)"
        :data-facet="facet"
        :value="filter">{{ filter }}</button>
        </template>
      </template>
    </div>
    <div class="mobile-base">
      <ul>
        <li @click="showNav('links')">
          Links
        </li>
        <li @click="showNav('shops')">
          Shops
        </li>
        <li @click="showNav('colors')">
          Colors <div class="count"
            v-if="selectedFilters.colors">({{ selectedFilters.colors.length }})</div>
        </li>
        <li @click="showNav('brands')">
          Brands <div class="count"
            v-if="selectedFilters.brands">({{ selectedFilters.brands.length }})</div>
        </li>
        <li @click="showNav('sizes')">
          Sizes <div class="count"
            v-if="selectedFilters.sizes">({{ selectedFilters.sizes.length }})</div>
        </li>
        <li @click="showNav('genders')">
          Genders <div class="count"
            v-if="selectedFilters.genders">({{ selectedFilters.genders.length }})</div>
        </li>
        <li @click="showNav('prices')">
          Prices
        </li>
        <li @click="showNav('coupons')">
          Coupons <div class="count"
            v-if="selectedFilters.coupons">({{ selectedFilters.coupons.length }})</div>
        </li>
      </ul>
    </div>
    <div ref="links" class="facet-links">
      <div class="facet-acc">
        <div class="acc-head">
          <div v-if="isMobile" class="facet-back" @click="goBack"></div>
          <h3 @click="toggleAccord">
            Links
          </h3>
        </div>
        <ul class="acc-body">
          <li>
            <a href="#">link</a>
          </li>
          <li>
            <a href="#">link</a>
          </li>
          <li>
            <a href="#">link</a>
          </li>
          <li>
            <a href="#">link</a>
          </li>
        </ul>
      </div>
    </div>
    <div ref="shops" class="facet-shops"></div>
    <div ref="colors" class="facet-colors">
      <div class="facet-acc">
        <div class="acc-head">
          <div v-if="isMobile" class="facet-back" @click="goBack"></div>
          <h3 @click="toggleAccord">
            Color
          </h3>
          <div v-if="selectedFilters.colors"
            class="filter-clear-mobile" @click="clearFilters('colors')">Clear</div>
        </div>
        <ul class="acc-body height-scroll">
          <li>
            <label for="facet-colors-red">
              <input type="checkbox" hidden id="facet-colors-red" value="red">
              <div class="swatch" style="background: red"></div>
              <div class="name">red</div>
            </label>
          </li>
          <li>
            <label for="facet-colors-green">
              <input type="checkbox" hidden id="facet-colors-green" value="green">
              <div class="swatch" style="background: green"></div>
              <div class="name">green</div>
            </label>
          </li>
          <li>
            <label for="facet-colors-blue">
              <input type="checkbox" hidden id="facet-colors-blue" value="blue">
              <div class="swatch" style="background: blue"></div>
              <div class="name">blue</div>
            </label>
          </li>
          <li>
            <label for="facet-colors-pink">
              <input type="checkbox" hidden id="facet-colors-pink" value="pink">
              <div class="swatch" style="background: pink"></div>
              <div class="name">pink</div>
            </label>
          </li>
          <li>
            <label for="facet-colors-yellow">
              <input type="checkbox" hidden id="facet-colors-yellow" value="yellow">
              <div class="swatch" style="background: yellow"></div>
              <div class="name">yellow</div>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div ref="brands" class="facet-brands">
      <div class="facet-acc">
        <div class="acc-head">
          <div v-if="isMobile" class="facet-back" @click="goBack"></div>
          <h3 @click="toggleAccord">
            Brands
          </h3>
          <div v-if="selectedFilters.brands"
            class="filter-clear" @click="clearFilters('brands')">Clear</div>
        </div>
        <ul class="acc-body checkbox-list">
          <li>
            <input hidden id="facet-brands-brand-one" type="checkbox" value="brand one">
            <label for="facet-brands-brand-one" data-qty="20">
              Brand One
            </label>
          </li>
          <li>
            <input hidden id="facet-brands-brand-two" type="checkbox" value="brand two">
            <label for="facet-brands-brand-two" data-qty="20">
              Brand Two
            </label>
          </li>
          <li>
            <input hidden id="facet-brands-brand-three" type="checkbox" value="brand three">
            <label for="facet-brands-brand-three" data-qty="20">
              Brand Three
            </label>
          </li>
          <li>
            <input hidden id="facet-brands-brand-four" type="checkbox" value="brand four">
            <label for="facet-brands-brand-four" data-qty="20">
              Brand Four
            </label>
          </li>
          <li>
            <input hidden id="facet-brands-brand-five" type="checkbox" value="brand five">
            <label for="facet-brands-brand-five" data-qty="20">
              Brand Five
            </label>
          </li>
          <li>
            <input hidden id="facet-brands-brand-six" type="checkbox" value="brand six">
            <label for="facet-brands-brand-six" data-qty="20">
              Brand Six
            </label>
          </li>
          <li>
            <input hidden id="facet-brands-brand-seven" type="checkbox" value="brand seven">
            <label for="facet-brands-brand-seven" data-qty="20">
              Brand Seven
            </label>
          </li>
          <li>
            <input hidden id="facet-brands-brand-eight" type="checkbox" value="brand eight">
            <label for="facet-brands-brand-eight" data-qty="20">
              Brand Eight
            </label>
          </li>
          <li>
            <input hidden id="facet-brands-brand-nine" type="checkbox" value="brand nine">
            <label for="facet-brands-brand-nine" data-qty="20">
              Brand Nine
            </label>
          </li>
          <li>
            <input hidden id="facet-brands-brand-ten" type="checkbox" value="brand ten">
            <label for="facet-brands-brand-ten" data-qty="20">
              Brand Ten
            </label>
          </li>
          <li>
            <input hidden id="facet-brands-brand-eleven" type="checkbox" value="brand eleven">
            <label for="facet-brands-brand-eleven" data-qty="20">
              Brand Eleven
            </label>
          </li>
          <li>
            <input hidden id="facet-brands-brand-twelve" type="checkbox" value="brand twelve">
            <label for="facet-brands-brand-twelve" data-qty="20">
              Brand Twelve
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div ref="sizes" class="facet-sizes">
      <div class="facet-acc">
        <div class="acc-head">
          <div v-if="isMobile" class="facet-back" @click="goBack"></div>
          <h3 @click="toggleAccord">
            Sizes
          </h3>
          <div v-if="selectedFilters.sizes"
            class="filter-clear" @click="clearFilters('sizes')">Clear</div>
        </div>
        <div class="acc-body">
          <div class="filter">
            <input v-model="searchSize"
              @keyup="doSearch"
              type="text"
              ref="search"
              placeholder="Find Size">
              <belk-icon height="12" width="12" name="search"></belk-icon>
          </div>
          <div class="filter-list height-scroll">
            <label
              v-for="item in filteredSizes"
              v-bind:key="item.index"
              :for="'facet-sizes-' + item.value">
              <input type="checkbox" :id="'facet-sizes-' + item.value" :value="item.value" hidden>
              <div>{{ item.value }}</div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div ref="genders" class="facet-genders"></div>
    <div ref="prices" class="facet-prices"></div>
    <div ref="coupons" class="facet-coupons"></div>
    <div ref="promos" class="facet-promos"></div>
    <div class="mobile-see-results">
      <sh-button @click="close" variant="primary" click-event="get-filters">
        See Results
      </sh-button>
    </div>
  </nav>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkFacetNav',

  data() {
    return {
      searchSize: '',
      searchableSizes: [
        {
          value: 'XS',
        },
        {
          value: 'S',
        },
        {
          value: 'M',
        },
        {
          value: 'L',
        },
        {
          value: 'XL',
        },
        {
          value: 'XXL',
        },
        {
          value: 'One Size',
        },
        {
          value: 'Panel Van',
        },
        {
          value: 'Weird Size Tho',
        },
      ],
      filteredSizes: [],
      selectedFilters: {},
    };
  },

  created() {
    this.filteredSizes = this.searchableSizes;
  },

  methods: {
    /* eslint-disable */
    events() {
      this.$bus.$on('get-filters', this.sendFilters);
      this.$bus.$on('facet-filters', this.updateElements);
    },

    updateElements(data) {
      console.log(data);
    },

    showNav(which) {
      this.$refs[which].classList.add('active');
    },

    mobileBack() {
      const el = this.$el.querySelectorAll('[class*="facet-"].active');
      if (el) el.classList.remove('active');
    },

    toggleAccord(e) {
      if (!this.isMobile()) e.target.closest('.facet-acc').classList.toggle('active');
    },

    doSearch(e) {
      let value = this.searchSize;
      if (value === '') {
        this.filteredSizes = this.searchableSizes;
      } else {
        value = value.toLowerCase();
        this.filteredSizes = this.searchableSizes.filter((item) => 
          ((item.value.toLowerCase().indexOf(value) >= 0)
          // || (item.description.toLowerCase().indexOf(value) >= 0)
          ));
      }
    },

    sendFilters() {
      const selectedFilters = {};
      const sizes = this.$refs.sizes.querySelectorAll(':checked');
      const colors = this.$refs.colors.querySelectorAll(':checked');
      const genders = this.$refs.genders.querySelectorAll(':checked');
      const promos = this.$refs.promos.querySelectorAll(':checked');
      const brands = this.$refs.brands.querySelectorAll(':checked');

      if (sizes.length) selectedFilters.sizes = this.extractVals(sizes);
      if (colors.length) selectedFilters.colors = this.extractVals(colors);
      if (genders.length) selectedFilters.genders = this.extractVals(genders);
      if (promos.length) selectedFilters.promos = this.extractVals(promos);
      if (brands.length) selectedFilters.brands = this.extractVals(brands);

      this.selectedFilters = selectedFilters;

      this.$bus.$emit('facet-filters', selectedFilters);
    },

    goBack() {
      const el = this.$el.querySelector('[class^="facet-"].active');
      if (el) el.classList.remove('active');
    },

    close() {
      this.$el.classList.remove('active');
    },

    isFiltered(which) {
      if (this.$refs[which]) {
        const filtered = this.$refs[which].querySelectorAll(':checked');
        return (filtered.length > 0);
      }
    },

    clearFilters(which) {
      const filtered = (which) ? this.$refs[which].querySelectorAll(':checked')
      : this.$el.querySelectorAll(':checked');
      for (let x = 0, l = filtered.length; x < l; x += 1) {
        filtered[x].checked = false;
      }
    },

    removeFilter(facet, filter) {
      const el = this.$refs[facet].querySelector(`[value="${filter}"]`);
      if (el) el.checked = false;
    },

    extractVals(els) {
      const vals = [];
      for (let x = 0, l = els.length; x < l; x += 1) {
        vals.push(els[x].value);
      }
      return vals;
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/mobile.scss"></style>
