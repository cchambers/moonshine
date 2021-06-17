<template>
  <div class="belk-facet-nav"
    :variant="variant"
    v-bind:class="{ 'snap-state': snapping }"
    v-hammer:tap="snap">
    <slot name="test">{{ msg }}</slot>
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
