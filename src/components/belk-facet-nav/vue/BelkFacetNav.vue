<template>
  <nav class="belk-facet-nav" :variant="variant" @change="updateFilters">
    <div class="mobile close-button" @click="toggleActive">
      <belk-icon name="close" height="22" width="22"></belk-icon>
    </div>
    <div class="mobile-base">
      <ul>
        <li @click="showNav('links')">Links</li>
        <li @click="showNav('shops')">Shops</li>
        <li @click="showNav('colors')">
          Colors
          <div class="count"
            v-if="selectedFilters.colors">({{ selectedFilters.colors.length }})</div>
        </li>
        <li @click="showNav('brands')">
          Brands
          <div class="count"
            v-if="selectedFilters.brands">({{ selectedFilters.brands.length }})</div>
        </li>
        <li @click="showNav('sizes')">
          Sizes
          <div class="count"
            v-if="selectedFilters.sizes">({{ selectedFilters.sizes.length }})</div>
        </li>
        <li @click="showNav('genders')">
          Genders
          <div
            class="count"
            v-if="selectedFilters.genders">({{ selectedFilters.genders.length }})</div>
        </li>
        <li @click="showNav('prices')">Prices</li>
        <li @click="showNav('coupons')">
          Coupons
          <div
            class="count"
            v-if="selectedFilters.coupons">({{ selectedFilters.coupons.length }})</div>
        </li>
      </ul>
    </div>

    <!-- <div ref="pickup" class="facet-pickup">
      <div class="facet-acc">
        <div class="acc-head">
          <h3 @click="toggleAccord"
            @keyup.enter="toggleAccord" tabindex="0">Pickup</h3>
        </div>
        <div class="acc-body">
          <slot name="pickup"></slot>
        </div>
      </div>
    </div> -->
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

    <!-- <div ref="links" class="facet-links">
      <div class="facet-acc" v-for="cat in links" :key="cat.id">
        <div class="acc-head">
          <button class="facet-back" @click="goBack"></button>
          <h3 @click="toggleAccord"
            @keyup.enter="toggleAccord" tabindex="0">{{ cat.name }}</h3>
        </div>
        <ul class="acc-body">
          <li v-for="item in cat.children" :key="item.id">
            <a :href="item.href" :data-cgid="item.cgid">{{ item.name }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div ref="shops" class="facet-shops">
      <div class="facet-acc">
        <div class="acc-head">
          <button class="facet-back" @click="goBack"></button>
          <h3 @click="toggleAccord"
            @keyup.enter="toggleAccord" tabindex="0">Shops</h3>
        </div>
        <div class="acc-body">[shops options]</div>
      </div>
    </div> -->
  <!-- <div class="filter-header">
    <div class="ha">Filters</div>
    <button
      v-if="Object.keys(selectedFilters).length"
      class="filter-clear"
        @click="clearFilters()"
      >Clear All</button>
  </div>
    <div ref="colors" class="facet-swatch">
      <div class="facet-acc">
        <div class="acc-head">
          <button class="facet-back" @click="goBack"></button>
          <h3 @click="toggleAccord"
            @keyup.enter="toggleAccord" tabindex="0">Color</h3>
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

    <div ref="brands" class="facet-brands">
      <div class="facet-acc">
        <div class="acc-head">
          <button class="facet-back" @click="goBack"></button>
          <h3 @click="toggleAccord"
            @keyup.enter="toggleAccord" tabindex="0">Brands</h3>
          <div
            v-if="selectedFilters.brands"
            class="filter-clear-mobile"
            @click="clearFilters('brands')"
          >Clear</div>
        </div>
        <ul class="acc-body checkbox-list">
          <li v-for="thing in brands" :key="thing.id" :set="slug = thing.name.slugify()">
            <input x-hidden :id="'facet-brands-' + slug" type="checkbox" :value="thing.name" />
            <label :for="'facet-brands-' + slug" :data-qty="thing.count">{{ thing.name }}</label>
          </li>
        </ul>
      </div>
    </div>

    <div ref="sizes" class="facet-sizes">
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

    <div ref="genders" class="facet-genders">
      <div class="facet-acc">
        <div class="acc-head">
          <button class="facet-back" @click="goBack"></button>
          <h3 @click="toggleAccord"
            @keyup.enter="toggleAccord" tabindex="0">Genders</h3>
        </div>
        <ul class="acc-body checkbox-list">
          <li v-for="thing in genders" :key="thing.id" :set="slug = thing.name.slugify()">
            <input x-hidden :id="'facet-genders-' + slug" type="checkbox" :value="thing.name" />
            <label :for="'facet-genders-' + slug" :data-qty="thing.count">{{ thing.name }}</label>
          </li>
        </ul>
      </div>
    </div>

    <div ref="prices" class="facet-prices">
      <div class="facet-acc">
        <div class="acc-head">
          <button class="facet-back" @click="goBack"></button>
          <h3 @click="toggleAccord"
            @keyup.enter="toggleAccord" tabindex="0">Prices</h3>
        </div>
        <ul class="acc-body radio-list">
          <li v-for="thing in prices" :key="thing.id" :set="slug = thing.name.slugify()">
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

    <div ref="promos" class="facet-promos">
      <div class="facet-acc">
        <div class="acc-head">
          <button class="facet-back" @click="goBack"></button>
          <h3 @click="toggleAccord"
            @keyup.enter="toggleAccord" tabindex="0">Sales &amp; Coupons</h3>
        </div>
        <div class="acc-body">[promos options]</div>
      </div>
    </div>

    <div class="mobile-see-results">
      <sh-button
        @click="toggleActive"
        variant="primary"
        click-event="get-filters">See Results</sh-button>
    </div>
    -->
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
        this.facets = obj.nav;
        obj.nav.forEach(thing => {
          switch (thing.type) {
            case 'filter':
              if (thing.name === 'Color') colors = thing.options;
              if (thing.name === 'Brand') brands = thing.options;
              if (thing.name === 'Size') sizes = thing.options;
              if (thing.name === 'Gender') genders = thing.options;
              if (thing.name === 'Price') prices = thing.options;
              break;
            case 'category':
              links.push(thing);
              break;
            default:
              break;
          }
        });
      }
      this.$set(this, 'links', links);
      this.$set(this, 'colors', colors);
      this.$set(this, 'brands', brands);
      this.$set(this, 'searchableSizes', sizes);
      this.$set(this, 'genders', genders);
      this.$set(this, 'prices', prices);
      window.prices = prices;
    },

    showNav(which) {
      this.$refs[which].classList.add('active');
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
