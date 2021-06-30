<template>
  <nav class="belk-facet-nav" :variant="variant" @change="updateFilters">
    <div class="mobile close-button" @click="toggleActive">
      <belk-icon name="close" height="22" width="22"></belk-icon>
    </div>
    <div class="mobile-base height-scroll">
      <ul>
        <li v-for="facet in facets"
          :key="facet.id"
          @click="showNav"
          :facet-target="facet.name.slugify()">
          {{ facet.name }}
        </li>
      </ul>
    </div>

    <div ref="pickup" class="facet-pickup">
      <div class="facet-acc">
        <div class="acc-head">
          <h3 @click="toggleAccord"
            @keyup.enter="toggleAccord" tabindex="0">Pickup</h3>
        </div>
        <div class="acc-body">
          <slot name="pickup"></slot>
        </div>
      </div>
    </div>
    <div class="facets-actual">
      <div v-for="facet in facets" :key="facet.id" :set="type = facet.type">
        <template v-if="type == 'active-filters'">
          <div class="filter-header">
            <div class="ha">Filters</div>
            <button
              v-if="Object.keys(selectedFilters).length"
              class="filter-clear"
                @click="clearFilters()"
              >Clear All</button>
          </div>
          <div class="filter-stack">
            <template v-for="(thing, facet) in selectedFilters">
              <template v-for="filter in thing">
                <button
                  v-bind:key="filter.index"
                  @click="removeFilter(facet, filter)"
                  :data-facet="facet"
                  :value="filter"
                >{{ filter }}</button>
              </template>
            </template>
          </div>
        </template>
        <template v-if="type == 'category'">
          <div class="facet-links">
            <div class="facet-acc">
              <div class="acc-head">
                <button class="facet-back" @click="goBack"></button>
                <h3 @click="toggleAccord"
                  @keyup.enter="toggleAccord" tabindex="0">{{ facet.name }}</h3>
              </div>
              <ul class="acc-body">
                <li v-for="thing in facet.children" :key="thing.id">
                  <a :href="thing.href" :data-cgid="thing.cgid">{{ thing.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </template>
        <template v-if="type == 'heading'">
          <div class="facet-heading">
            {{ facet.name }}
          </div>
        </template>
        <template v-if="type == 'filter'">
          <template v-if="facet.form ==  'swatch'">
            <div :set="facetName = facet.name.slugify()"
              :facet-name="facetName" class="facet-filter filter-swatch">
              <div class="facet-acc">
                <div class="acc-head">
                  <button class="facet-back" @click="goBack"></button>
                  <h3 @click="toggleAccord"
                    @keyup.enter="toggleAccord" tabindex="0">{{ facet.name }}</h3>
                  <div
                    v-if="selectedFilters.colors"
                    class="filter-clear-mobile"
                    @click="clearFilters('colors')"
                  >Clear</div>
                </div>
                <ul class="acc-body height-scroll">
                  <li v-for="color in colors" :key="color.id">
                    <input
                      type="checkbox"
                      x-hidden
                      :id="'facet-swatch-' + color.name"
                      :value="color.name" />
                    <label :for="'facet-swatch-' + color.name">
                      <div class="swatch" :style="'background: ' + color.rgb"></div>
                      <div class="name">{{ color.name }}</div>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <template v-if="facet.form ==  'checkbox'">
            <div :set="facetName = facet.name.slugify()"
              :facet-name="facetName" class="facet-filter filter-checkbox">
              <div class="facet-acc">
                <div class="acc-head">
                  <button class="facet-back" @click="goBack"></button>
                  <h3 @click="toggleAccord"
                    @keyup.enter="toggleAccord" tabindex="0">{{ facet.name }}</h3>
                  <div
                    v-if="selectedFilters.colors"
                    class="filter-clear-mobile"
                    @click="clearFilters('colors')"
                  >Clear</div>
                </div>
                <ul class="acc-body checkbox-list">
                  <li v-for="thing in facet.options"
                    :key="thing.id"
                    :set="slug = thing.name.slugify()">
                    <input x-hidden :id="'facet-' + facetName + '-' + slug"
                      type="checkbox" :value="thing.name" />
                    <label :for="'facet-' + facetName + '-' + slug"
                      :data-qty="thing.count">{{ thing.name }}</label>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <template v-if="facet.form ==  'range'">
            <div :set="facetName = facet.name.slugify()"
              :facet-name="facetName" class="facet-filter filter-range">
              <div class="facet-acc">
                <div class="acc-head">
                  <button class="facet-back" @click="goBack"></button>
                  <h3 @click="toggleAccord"
                    @keyup.enter="toggleAccord" tabindex="0">{{ facet.name }}</h3>
                </div>
                <ul class="acc-body radio-list">
                  <li v-for="thing in facet.options"
                    :key="thing.id" :set="slug = thing.name.slugify()">
                    <input :id="'price-' + slug" x-hidden
                      type="radio"
                      name="facet-prices"
                      :value="thing.name" />
                    <label :for="'price-' + slug">
                      <div :data-qty="thing.count">{{ thing.name }}</div>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <template v-if="facet.form ==  'grid'">
            <div :set="facetName = facet.name.slugify()"
              :facet-name="facetName" class="facet-filter filter-grid">
              <div class="facet-acc">
                <div class="acc-head">
                  <button class="facet-back" @click="goBack"></button>
                  <h3 @click="toggleAccord"
                    @keyup.enter="toggleAccord" tabindex="0">Sizes</h3>
                  <div
                    v-if="selectedFilters.sizes"
                    class="filter-clear-mobile"
                    @click="clearFilters('sizes')"
                  >Clear</div>
                </div>
                <div class="acc-body">
                  <div class="filter">
                    <input
                      v-model="searchSize"
                      @keyup="doSearch"
                      type="text"
                      ref="search"
                      placeholder="Find Size"
                    />
                    <belk-icon height="12" width="12" name="search"></belk-icon>
                  </div>
                  <div class="filter-list height-scroll">
                    <label
                      v-for="thing in filteredSizes"
                      v-bind:key="thing.index"
                      :set="slug = thing.name.slugify()"
                      :for="'facet-sizes-' + slug">
                      <input type="checkbox"
                        x-hidden
                        :id="'facet-sizes-' + slug"
                        :value="thing.name"/>
                      <div>{{ thing.name }}</div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
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
      facets: [],
      links: [],
      colors: [],
      brands: [],
      genders: [],
      prices: [],
      sizes: [],
      searchSize: '',
      searchableSizes: [],
      filteredSizes: [],
      selectedFilters: {},
    };
  },

  watch: {
    searchableSizes(val) {
      this.filteredSizes = val;
    },
  },

  created() {
    this.filteredSizes = this.searchableSizes;
  },

  mounted() {
    setTimeout(() => {
      if (window.facetNav) this.processData(window.facetNav);
    });
  },

  methods: {
    /* eslint-disable */
    events() {
      this.$on('update-filters', this.updateFilters);
      this.$bus.$on('get-filters', this.sendFilters);
      this.$bus.$on('show-filters', this.toggleActive);
      this.$bus.$on('clear-filters', this.clearFilters);
      this.$bus.$on('facet-nav-data', e => {
        console.log(e);
      });
    },

    processData(obj) {
      const links = [];
      let colors, brands, sizes, genders, prices;
      if (obj.nav) {
        this.filterData = obj.nav.shift();
        this.facets = obj.nav;
      }
    },

    showNav(e) {
      const target = e.target;
      const which = target.getAttribute('facet-target');
      console.log(which);
      if (which) {
        const el = this.$el.querySelector('[facet-name="'+which+'"]');
        console.log(el);
        if (el) el.classList.add('active');
      }
    },

    mobileBack() {
      const el = this.$el.querySelectorAll('[class*="facet-"].active');
      if (el) el.classList.remove('active');
    },

    toggleAccord(e) {
      if (!this.isMobile())
        e.target.closest('.facet-acc').classList.toggle('active');
    },

    doSearch(e) {
      let value = this.searchSize;
      if (value === '') {
        this.filteredSizes = this.searchableSizes;
      } else {
        value = value.toLowerCase();
        this.filteredSizes = this.searchableSizes.filter(
          item =>
            item.name.toLowerCase().indexOf(value) >= 0,
            // || (item.description.toLowerCase().indexOf(value) >= 0)
        );
      }
    },

    updateFilters() {
      const selectedFilters = {};
      const facets = this.$el.querySelectorAll('[facet-name]');
      for (let x = 0, l = facets.length; x < l; x += 1) {
        let name = facets[x].getAttribute('facet-name');
        if (name) {
          const values = this.extractVals(facets[x]);
          if (values.length) selectedFilters[name] = values;
        }
      }
      this.$set(this, 'selectedFilters', selectedFilters);
    },

    sendFilters() {
      this.updateFilters();
      this.$bus.$emit('facet-filters', this.selectedFilters);
    },

    goBack() {
      const el = this.$el.querySelector('[class^="facet-"].active');
      if (el) el.classList.remove('active');
    },

    toggleActive() {
      this.$el.classList.toggle('active');
      document.documentElement.classList.toggle('filters-active');
      this.goBack();
    },

    isFiltered(which) {
      if (this.$refs[which]) {
        const filtered = this.$refs[which].querySelectorAll(':checked');
        return filtered.length > 0;
      }
    },

    clearFilters(which) {
      const filtered = which
        ? this.$el.querySelectorAll(`[facet-name="${which}"] :checked`)
        : this.$el.querySelectorAll(':checked');
      for (let x = 0, l = filtered.length; x < l; x += 1) {
        filtered[x].checked = false;
      }
      this.$emit('update-filters');
    },

    removeFilter(facet, filter) {
      const el = this.$el.querySelector(`[facet-name="${facet}"] [value="${filter}"]`);
      if (el) el.checked = false;
      this.$emit('update-filters');
    },

    extractVals(facet) {
      const els = facet.querySelectorAll(':checked');
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
