<template>
  <nav
    class="belk-facet-nav"
    :class="{ active: navActive }"
    :variant="variant"
    @change="updateFilters"
  >
    <div class="mobile close-button" @click="toggleActive">
      <belk-icon name="close" height="22" width="22"></belk-icon>
    </div>
    <div class="mobile-base">
      <ul ref="basescroll">
        <li
          v-for="facet in mobileOnly"
          :key="facet.id"
          @click="showNav"
          :facet-target="facet.name.slugify()"
        >
          {{ facet.name }}
          <div
            class="count"
            v-if="selectedFilters[facet.name.slugify()]
              && selectedFilters[facet.name.slugify()].length > 0"
          >({{ selectedFilters[facet.name.slugify()].length }})</div>
        </li>
      </ul>
    </div>
    <div class="filter-header">
      <div class="ha">Filters</div>
      <button
        v-if="Object.keys(selectedFilters).length"
        class="filter-clear"
        @click="clearAllFilters"
      >Clear All</button>
    </div>
    <div v-for="facet in facets" :key="facet.id" :set="type = facet.type">
      <template v-if="type == 'active-filters'">
        <div class="filter-stack">
          <template v-for="(option) in facet.options">
            <a
              v-bind:key="option.index"
              :href="option.href"
            >{{ option.name }}</a>
          </template>
        </div>
      </template>
    </div>
    <div ref="pickup" class="facet-pickup" facet-name="pickup">
      <div class="facet-acc active">
        <div class="acc-head">
          <h3 @click="toggleAccord" @keyup.enter="toggleAccord" tabindex="0">Pickup</h3>
        </div>
        <div class="acc-body">
          <slot name="pickup"></slot>
        </div>
      </div>
    </div>
    <div class="facets-actual">
      <div v-for="facet in facets" :key="facet.id" :set="type = facet.type">
        <template v-if="type === 'category'">
          <div :set="facetName = facet.name.slugify()" :facet-name="facetName" class="facet-links">
            <div :class="{ 'active': facet.expanded }" class="facet-acc">
              <div class="acc-head">
                <button class="facet-back" @click="goBack"></button>
                <h3 @click="toggleAccord"
                  @keyup.enter="toggleAccord" tabindex="0">
                  <a :title="'Go to category: ' + facet.name"
                  :href="facet.href">{{ facet.name }}</a>
                </h3>
              </div>
              <div class="acc-body height-scroll">
                <ul>
                  <li v-for="thing in facet.children" :key="thing.id">
                    <a
                      :href="thing.href"
                      :title="'Go to category: ' + thing.name"
                      :data-cgid="thing.cgid"
                      :data-qty="thing.count"
                      :class="{ bold: thing.selected }"
                    >{{ thing.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>
        <template v-if="type === 'heading'">
          <div class="facet-heading">{{ facet.name }}</div>
        </template>
        <template v-if="type === 'filter'">
          <template v-if="facet.form === 'swatch'">
            <div
              :set="facetName = facet.name.slugify()"
              :facet-name="facetName"
              class="facet-filter filter-swatch"
            >
              <div :class="{ 'active': facet.expanded }" class="facet-acc">
                <div class="acc-head">
                  <button class="facet-back" @click="goBack"></button>
                  <h3
                    @click="toggleAccord"
                    @keyup.enter="toggleAccord"
                    tabindex="0"
                  >{{ facet.name }}</h3>
                  <div
                    v-if="selectedFilters[facetName]"
                    class="filter-clear-mobile"
                    @click="clearFilters"
                  >Clear</div>
                </div>
                <div class="acc-body">
                  <div class="height-scrol">
                    <ul>
                      <li v-for="color in facet.options" :key="color.id"
                        :title="'Refine by: ' + color.name">
                        <input
                          type="checkbox"
                          x-hidden
                          :id="'facet-swatch-' + color.name"
                          :value="color.name"
                          :checked="color.selected"
                          :href="color.href"
                          :params="color.params"
                        />
                        <label :for="'facet-swatch-' + color.name">
                          <div class="swatch" :style="getBackground(color)"></div>
                          <div class="name">{{ color.name }}</div>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-if="facet.form === 'checkbox'">
            <div
              :set="facetName = facet.name.slugify()"
              :facet-name="facetName"
              class="facet-filter filter-checkbox"
            >
              <div :class="{ 'active': facet.expanded }" class="facet-acc">
                <div class="acc-head">
                  <button class="facet-back" @click="goBack"></button>
                  <h3
                    @click="toggleAccord"
                    @keyup.enter="toggleAccord"
                    tabindex="0"
                  >{{ facet.name }}</h3>
                  <div
                    v-if="selectedFilters[facetName]"
                    class="filter-clear-mobile"
                    @click="clearFilters"
                  >Clear</div>
                </div>
                <div class="acc-body">
                  <div class="filter" v-if="facet.search">
                    <input @keyup="doSearch" type="text" :placeholder="'Find ' + facet.name"
                    :class="'search-' + facet.name.slugify()" />
                    <template v-if="hasValue('search-'+facet.name.slugify())">
                      <button class="clear-search flex"
                        aria-role="button"
                        aria-label="clear search field"
                        @click="clearNearest">
                      <belk-icon height="12" width="12" name="close">Clear Input</belk-icon>
                      </button>
                    </template>
                    <template v-else>
                      <belk-icon height="12" width="12" name="search">Search Filters</belk-icon>
                    </template>
                  </div>
                  <div :class="{ 'filter-list': facet.search }" class="height-scroll">
                    <ul class="checkbox-list">
                      <template v-if="facet.search">
                        <div v-if="!filteredData[facet.name.slugify()].length" class="nodata">
                          No results found
                        </div>
                        <li
                          v-for="thing in filteredData[facet.name.slugify()]"
                          :key="thing.id"
                          :set="slug = thing.name.slugify()"
                          :title="'Refine by: ' + thing.name"
                        >
                          <input
                            x-hidden
                            :id="'facet-' + facetName + '-' + slug"
                            type="checkbox"
                            :value="thing.name"
                            :checked="thing.selected"
                            :href="thing.href"
                            :params="thing.params"
                          />
                          <label
                            :for="'facet-' + facetName + '-' + slug"
                          ><div :data-qty="thing.count">{{ thing.name }}</div></label>
                        </li>
                      </template>
                      <template v-else>
                        <li
                          v-for="thing in facet.options"
                          :key="thing.id"
                          :set="slug = thing.name.slugify()"
                          :title="'Refine by: ' + thing.name"
                        >
                          <input
                            x-hidden
                            :id="'facet-' + facetName + '-' + slug"
                            type="checkbox"
                            :value="thing.name"
                            :checked="thing.selected"
                            :href="thing.href"
                            :params="thing.params"
                          />
                          <label
                            :for="'facet-' + facetName + '-' + slug"
                          ><div :data-qty="thing.count">{{ thing.name }}</div></label>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-if="facet.form === 'range'">
            <div
              :set="facetName = facet.name.slugify()"
              :facet-name="facetName"
              class="facet-filter filter-range"
            >
              <div :class="{ 'active': facet.expanded }" class="facet-acc">
                <div class="acc-head">
                  <button class="facet-back" @click="goBack"></button>
                  <h3
                    @click="toggleAccord"
                    @keyup.enter="toggleAccord"
                    tabindex="0"
                  >{{ facet.name }}</h3>
                  <div
                    v-if="selectedFilters[facetName]"
                    class="filter-clear-mobile"
                    @click="clearFilters"
                  >Clear</div>
                </div>
                <div class="acc-body">
                  <ul class="radio-list height-scroll">
                    <li
                      v-for="thing in facet.options"
                      :key="thing.id"
                      :set="slug = thing.name.slugify()"
                      :title="'Refine by: ' + thing.name"
                    >
                      <input
                        :id="'range-' + slug"
                        x-hidden
                        type="radio"
                        name="facet-price"
                        :value="thing.name"
                        :checked="thing.selected"
                        :href="thing.href"
                        :params="thing.params"
                        @focus="customChecked = false;"
                      />
                      <label :for="'range-' + slug">
                        <div :data-qty="thing.count">{{ thing.name }}</div>
                      </label>
                    </li>
                    <li>
                      <input
                        id="range-custom"
                        x-hidden
                        type="radio"
                        name="facet-price"
                        value="custom"
                        :params="customParams"
                        :checked="customChecked"
                      />
                      <label for="range-custom">
                        <div>Custom Price Range</div>
                      </label>
                      <div class="custom-range">
                        <input type="tel"
                          @beforeinput="sanitizeCustomRange"
                          @paste="false"
                          @focus="customChecked = true"
                          min="0"
                          id="range-from"
                          name="range-from"
                          placeholder="$Min"
                          v-model.trim.number="fromVal"
                          ref="rangefrom" />
                        <div class="flex margin-x-atomic">to</div>
                        <input type="tel"
                          @beforeinput="sanitizeCustomRange"
                          @paste="false"
                          @focus="customChecked = true"
                          min="0"
                          id="range-to"
                          name="range-to"
                          placeholder="$Max"
                          v-model.trim.number="toVal"
                          ref="rangeto" />
                        <sh-button
                          variant="secondary"
                          size="sm"
                          @click="handleGoButton"
                          ref="pricebutton">Go</sh-button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </template>
          <template v-if="facet.form === 'grid'">
            <div
              :set="facetName = facet.name.slugify()"
              :facet-name="facetName"
              class="facet-filter filter-grid"
            >
              <div :class="{ 'active': facet.expanded }" class="facet-acc">
                <div class="acc-head">
                  <button class="facet-back" @click="goBack"></button>
                  <h3
                    @click="toggleAccord"
                    @keyup.enter="toggleAccord"
                    tabindex="0"
                  >{{ facet.name }}</h3>
                  <div
                    v-if="selectedFilters[facetName]"
                    class="filter-clear-mobile"
                    @click="clearFilters"
                  >Clear</div>
                </div>
                <div class="acc-body">
                  <div class="filter" v-if="facet.search">
                    <input
                      @keyup="doSearch"
                      type="text"
                      ref="search"
                      placeholder="Find Size"
                      :class="'facet-' + facet.name.slugify()" />
                    <template v-if="hasValue('facet-'+facet.name.slugify())">
                      <button class="clear-search flex"
                        aria-role="button"
                        aria-label="clear search field"
                        @click="clearNearest">
                      <belk-icon height="12" width="12" name="close">Clear Input</belk-icon>
                      </button>
                    </template>
                    <template v-else>
                      <belk-icon height="12" width="12" name="search">Search Filters</belk-icon>
                    </template>
                  </div>
                  <div class="height-scroll">
                    <div class="filter-list">
                      <template v-if="facet.search">
                        <div v-if="!filteredData[facet.name.slugify()].length" class="nodata">
                          No results found
                        </div>
                        <label
                          v-for="thing in filteredData[facet.name.slugify()]"
                          v-bind:key="thing.index"
                          :set="slug = thing.name.slugify()"
                          :for="'facet-grid-' + slug"
                          :title="'Refine by: ' + thing.name"
                        >
                          <input
                            type="checkbox"
                            x-hidden
                            :id="'facet-grid-' + slug"
                            :value="thing.name"
                            :checked="thing.selected"
                            :href="thing.href"
                            :params="thing.params"
                          />
                          <div>{{ thing.name }}</div>
                        </label>
                      </template>
                      <template v-else>
                        <label
                          v-for="thing in facet.options"
                          v-bind:key="thing.index"
                          :set="slug = thing.name.slugify()"
                          :for="'facet-sizes-' + slug"
                          :title="'Refine by: ' + thing.name"
                        >
                          <input
                            type="checkbox"
                            x-hidden
                            :id="'facet-sizes-' + slug"
                            :value="thing.name"
                            :checked="thing.selected"
                            :href="thing.href"
                            :params="thing.params"
                          />
                          <div>{{ thing.name }}</div>
                        </label>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
    <div class="mobile-footer">
      <sh-button
        variant="primary"
        full
        @click="sendFilters(true)"
      >See Results</sh-button>
    </div>
  </nav>
</template>

<script>
import _ from 'lodash';
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
      clearHref: '',
      searchableData: {},
      filteredData: {},
      searchSize: '',
      selectedFilters: {},
      selectedFilterHref: '',
      selectedFilterParams: [],
      navActive: false,
      customChecked: false,
      toVal: '',
      fromVal: '',
      customParams: '',
      failOnce: false,
      loaded: false,
    };
  },

  computed: {
    mobileOnly() {
      return this.facets.filter((item) => item.name);
    },
  },

  watch: {
    toVal() {
      this.updateCustomParam();
    },
    fromVal() {
      this.updateCustomParam();
    },
    customChecked(val) {
      if (val && this.isMobile) {
        const el = this.$el.querySelector('.custom-range');
        if (el) el.closest('.height-scroll').scrollTop = 400;
      }
    },
  },

  mounted() {
    setTimeout(() => {
      if (window.facetNav) this.processData(window.facetNav);
    });
    this.loaded = true;
    // setTimeout(() => {
    //   this.updateFilters('mounted');
    // }, 1000);
    // this.customChecked = (window.location.href.indexOf('pmin') > 0);
  },

  methods: {
    /* eslint-disable */
    events() {
      this.$on('update-filters', () => { this.updateFilters('event update-filters')});
      this.$bus.$on('get-filters', () => { this.sendFilters(true) });
      this.$bus.$on('show-filters', this.toggleActive);
      this.$bus.$on('clear-filters', this.clearFilters);
      // this.$bus.$on('facet-nav-data', e => {
      //   console.log(e);
      // });
    },

    processData(obj) {
      const links = [];
      if (obj.nav) {
        this.facets = obj.nav.slice();
        for (let x = 0, l = this.facets.length; x < l; x += 1) {
          const facet = this.facets[x];
          if (facet.search) {
            const slug = facet.name.slugify();
            this.searchableData[slug] = facet.options;
          }
        }
      }
      if (obj.config && obj.config.clearHref !== '') {
        this.clearHref = obj.config.clearHref;
      }
      this.filteredData = _.cloneDeep(this.searchableData);
    },

    showNav(e) {
      const target = e.target;
      const which = target.getAttribute('facet-target');
      if (which) {
        const el = this.$el.querySelector('[facet-name="' + which + '"]');
        if (el) el.classList.add('active');
      }
    },

    mobileBack() {
      const el = this.$el.querySelectorAll('[facet-name"].active');
      if (el) el.classList.remove('active');
    },

    toggleAccord(e) {
      if (!this.isMobile()) {
        e.target.closest('.facet-acc').classList.toggle('active');
      }
    },

    doSearch(e) {
      const el = e.target;
      let value = el.value;
      const facet = e.target.closest('[facet-name]').getAttribute('facet-name');
      if (value === '') {
        this.$set(this.filteredData, facet, _.cloneDeep(this.searchableData[facet]));
      } else {
        value = value.toLowerCase();
        const filterTest = _.cloneDeep(this.searchableData[facet]);
        const filtered = filterTest.filter(
          item => item.name.toLowerCase().indexOf(value) >= 0,
        );
        this.$set(this.filteredData, facet, filtered);
        this.$forceUpdate();
      }
    },

    handleGoButton(e) {
      const isValid = this.validateCustomRange();
      if (!isValid) {
        e.preventDefault();
      } else {
        const baseUrl = this.$el.querySelector('[name=facet-price]').getAttribute('href');
        this.$bus.$emit('facet-custom', { from: this.fromVal, to: this.toVal, baseUrl: baseUrl });
      }
    },

    sanitizeCustomRange() {
      const char = event.data;
      const sanity = new RegExp(/^(\d*)(\.)?[0-9]?[0-9]?$/);
      const value = (char) ? event.target.value + char : event.target.value;
      const good = value.match(sanity);
      if (!good) event.preventDefault();
    },

    validateCustomRange() {
      let fail = false;
      const from = this.$el.querySelector('#range-from');
      const to = this.$el.querySelector('#range-to');
      const fromEmpty = (this.fromVal === '');
      const toEmpty = (this.toVal === '');

      if (toEmpty || this.toVal <= this.fromVal) { // if TO value <= FROM value
          to.style.border = '1px solid red';
        if (!fail) { // if fail hasn't been set yet
          to.focus();
          fail = true;
        }
      } else {
        if (!fromEmpty && toEmpty) to.value = 0; // if from value, but no to value, default to "0"
        to.style.border = '';
      }

      if (fromEmpty) { // if FROM value empty
        if (!toEmpty) {
          from.value = 0;
        } else {
          fail = true;
          from.style.border = '1px solid red';
          from.focus();
        }
      } else {
        from.style.border = '';
      }
      return (!fail) ? [this.toVal, this.fromVal] : false;
    },

    updateFilters(e) {
      if (!this.loaded) return;
      const selectedFilters = {};
      const selectedFilterParams = [];
      let selectedFilterHref = '';
      const facets = this.$el.querySelectorAll('[facet-name]');
      for (let x = 0, l = facets.length; x < l; x += 1) {
        let name = facets[x].getAttribute('facet-name');
        if (name) {
          const values = this.extractVals(facets[x]);
          if (values.length) selectedFilters[name] = values;
        }
      }
      const params = this.extractParams();
      if (params.length) {
        selectedFilterParams.push(...params);
      } else {
        this.failOnce = true;
      }
      if (e && e.target) {
        selectedFilterHref = e.target.getAttribute('href');
      }
      this.$set(this, 'selectedFilters', selectedFilters);
      this.$set(this, 'selectedFilterHref', selectedFilterHref);
      this.$set(this, 'selectedFilterParams', selectedFilterParams);
      if (!this.isMobile()) this.sendFilters();
    },

    sendFilters(update) {
      if (update) this.updateFilters('sendFilters');
      this.$bus.$emit('facet-filters', this.selectedFilters);
      if (this.failOnce) {
        this.failOnce = false;
        this.log('fail once');
      } else {
        if (!this.isMobile()) {
          this.$bus.$emit('facet-link', this.selectedFilterHref);
        } else {
          // if custom range and it?
          this.$bus.$emit('facet-params', this.selectedFilterParams);
        }
      }
    },

    goBack() {
      const el = this.$el.querySelector('[facet-name].active');
      if (el) el.classList.remove('active');
    },

    toggleActive() {
      this.navActive = !this.navActive;
      this.$el.classList.toggle('active');
      const cl = document.documentElement.classList;
      if (this.navActive) {
        cl.add('scroll-block');
        this.$refs.basescroll.scrollTop = 0;
      } else {
        cl.remove('scroll-block');
        this.goBack();
      }
    },

    isFiltered(which) {
      if (this.$refs[which]) {
        const filtered = this.$refs[which].querySelectorAll('[x-hidden]:checked');
        return filtered.length > 0;
      }
    },

    clearFilters(e) {
      let which = '';
      if (e) {
        const target = e.target;
        const el = target.closest('[facet-name]');
        if (el) which = el.getAttribute('facet-name');
      }
      const filtered = which
        ? this.$el.querySelectorAll(`[facet-name="${which}"] [x-hidden]:checked`)
        : this.$el.querySelectorAll('[x-hidden]:checked');
      for (let x = 0, l = filtered.length; x < l; x += 1) {
        filtered[x].checked = false;
      }
      this.$emit('update-filters');
    },

    clearAllFilters() {
      this.$bus.$emit('facet-link', this.clearHref);
    },

    removeFilter(facet, filter) {
      const el = this.$el.querySelector(
        `[facet-name="${facet}"] [value="${filter}"]`,
      );
      let selectedFilterHref = '';
      if (el) {
        el.checked = false;
        selectedFilterHref = el.getAttribute('href');
        this.$set(this, 'selectedFilterHref', selectedFilterHref);
      }
      this.$bus.$emit('facet-link', this.selectedFilterHref);
    },

    extractVals(facet) {
      const els = facet.querySelectorAll('[x-hidden]:checked');
      const vals = [];
      for (let x = 0, l = els.length; x < l; x += 1) {
        const value = els[x].value;
        if (value !== 'custom') vals.push(value);
      }
      return vals;
    },

    // extractLinks(facet) {
    //   const els = facet.querySelectorAll(':checked');
    //   const vals = [];
    //   for (let x = 0, l = els.length; x < l; x += 1) {
    //     vals.push(els[x].getAttribute('href'));
    //   }
    //   return vals;
    // },

    extractParams() {
      const els = this.$el.querySelectorAll('[x-hidden]:checked');
      const vals = [];
      for (let x = 0, l = els.length; x < l; x += 1) {
        const el = els[x];
        const attr = el.getAttribute('params');
        if (el.value !== 'custom') {
          if (attr !== '') vals.push(attr);
        }
      }

      const customRangeEl = this.$el.querySelector('#range-custom');
      if (customRangeEl.checked) { // if  in custom range...
        if (this.validateCustomRange()) {
          vals.push(this.customParams);
        }
      }

      return vals;
    },

    getBackground(color) {
      if (color.src) {
        return 'background-image: url(' + color.src + ')';
      } else {
        return 'background: ' + color.rgb;
      }
    },

    hasValue(slug) {
      const el = this.$el.querySelector(`.${slug}`);
      if (!el) return;  
      if (el.value.length) return true;
      return false;
    },

    clearNearest(e) {
      const inp = e.target.previousElementSibling;
      if (inp) {
        inp.value = '';
        inp.focus();
        const event = new CustomEvent('keyup');
        inp.dispatchEvent(event);
      }
      this.$forceUpdate();
    },

    updateCustomParam() {
      const val = (this.fromVal && this.toVal)
        ? `?pmin=${this.fromVal}&pmax=${this.toVal}`
        : '';
      this.customParams = val;
    }
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/mobile.scss"></style>
