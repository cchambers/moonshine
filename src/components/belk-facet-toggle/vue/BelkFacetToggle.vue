<template>
  <div class="belk-facet-toggle"
    :variant="variant">
    <template v-for="thing in activeFilters">
      <a
        v-bind:key="thing.index"
        :href="thing.href"
      >{{ thing.name }}</a>
    </template>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkFacetToggle',

  data() {
    return {
      activeFilters: [],
    };
  },

  methods: {
    events() {
      this.$bus.$on('active-filters', this.handleFilters);
    },

    handleFilters(response) {
      this.$set(this, 'activeFilters', response);
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
