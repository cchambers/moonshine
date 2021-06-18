<template>
  <div class="belk-facet-nav"
    :variant="variant">
    <div ref="links" class="facet-links">
      <h3>
        Title
      </h3>
      <ul>
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
    <div ref="shops" class="facet-shops"></div>
    <div ref="brands" class="facet-brands">
      <h3>Brand</h3>
      <ul>
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
    <div ref="colors" class="facet-colors">
      <sh-accordion>
        <h3 slot="header">
          Colors
        </h3>
        <ul slot="body">
          <li>
            <button>
              <div class="swatch" style="background: red"></div>
              <div class="name">Red</div>
            </button>
          </li>
          <li>
            <button class="active">
              <div class="swatch" style="background: green"></div>
              <div class="name">Green</div>
            </button>
          </li>
          <li>
            <button>
              <div class="swatch" style="background: blue"></div>
              <div class="name">Blue</div>
            </button>
          </li>
          <li>
            <button></button>
          </li>
        </ul>
      </sh-accordion>
    </div>
    <div ref="sizes" class="facet-sizes"></div>
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

  methods: {
    //
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
