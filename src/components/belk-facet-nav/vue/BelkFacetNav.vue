<template>
  <div class="belk-facet-nav"
    :variant="variant">
    <div ref="links" class="facet-links">
      <div class="facet-acc">
        <h3 @click="toggleAccord">
          Title
        </h3>
        <ul class="acc-body">
          <li>
            <a href="#" data-qty="20">link</a>
          </li>
          <li>
            <a href="#" data-qty="20">link</a>
          </li>
          <li>
            <a href="#" data-qty="20">link</a>
          </li>
          <li>
            <a href="#" data-qty="20">link</a>
          </li>
        </ul>
      </div>
    </div>
    <div ref="shops" class="facet-shops"></div>
    <div ref="brands" class="facet-brands">
      <div class="facet-acc">
        <h3 @click="toggleAccord">
          Brand
        </h3>
        <ul class="acc-body">
          <li>
            <a href="#" data-qty="20">more than 9 links</a>
          </li>
          <li>
            <a href="#" data-qty="20">more than 9 links</a>
          </li>
          <li>
            <a href="#" data-qty="20">more than 9 links</a>
          </li>
          <li>
            <a href="#" data-qty="20">more than 9 links</a>
          </li>
          <li>
            <a href="#" data-qty="20">more than 9 links</a>
          </li>
          <li>
            <a href="#" data-qty="20">more than 9 links</a>
          </li>
          <li>
            <a href="#" data-qty="20">more than 9 links</a>
          </li>
          <li>
            <a href="#" data-qty="20">more than 9 links</a>
          </li>
          <li>
            <a href="#" data-qty="20">more than 9 links</a>
          </li>
          <li>
            <a href="#" data-qty="20">more than 9 links</a>
          </li>
          <li>
            <a href="#" data-qty="20">more than 9 links</a>
          </li>
          <li>
            <a href="#" data-qty="20">more than 9 links</a>
          </li>
        </ul>
      </div>
    </div>
    <div ref="colors" class="facet-colors">
      <div class="facet-acc">
        <h3 @click="toggleAccord">
          Colors
        </h3>
        <ul class="acc-body height-scroll">
          <li>
            <label for="facet-colors-red">
              <input type="checkbox" hidden id="facet-colors-red">
              <div class="swatch" style="background: red"></div>
              <div class="name">red</div>
            </label>
          </li>
          <li>
            <label for="facet-colors-green">
              <input type="checkbox" hidden id="facet-colors-green">
              <div class="swatch" style="background: green"></div>
              <div class="name">green</div>
            </label>
          </li>
          <li>
            <label for="facet-colors-blue">
              <input type="checkbox" hidden id="facet-colors-blue">
              <div class="swatch" style="background: blue"></div>
              <div class="name">blue</div>
            </label>
          </li>
          <li>
            <label for="facet-colors-pink">
              <input type="checkbox" hidden id="facet-colors-pink">
              <div class="swatch" style="background: pink"></div>
              <div class="name">pink</div>
            </label>
          </li>
          <li>
            <label for="facet-colors-yellow">
              <input type="checkbox" hidden id="facet-colors-yellow">
              <div class="swatch" style="background: yellow"></div>
              <div class="name">yellow</div>
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div ref="sizes" class="facet-sizes">
      <div class="facet-acc">
        <h3 @click="toggleAccord">
          Sizes
        </h3>
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
    <div ref="prices" class="facet-prices"></div>
    <div ref="coupons" class="facet-coupons"></div>
    <div ref="promos" class="facet-promos"></div>
  </div>
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
    };
  },

  created() {
    this.filteredSizes = this.searchableSizes;
  },

  methods: {
    /* eslint-disable */
    toggleAccord(e) {
      e.target.closest('.facet-acc').classList.toggle('active');
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
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
