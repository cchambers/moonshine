<template>
  <div class="belk-swatch"
    :variant="variant">
    <slot></slot>
  </div>
</template>

<script>
import ComponentPrototype from '../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkSwatch',

  props: {
    msg: {
      type: String,
      default: 'new component',
    },
  },

  data() {
    return {
      snapping: false,
    };
  },

  methods: {

  },

};
</script>
<style lang="scss" src="./style/default.scss"></style>
<style lang="scss" src="./style/primary.scss"></style>
