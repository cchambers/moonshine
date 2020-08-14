<template>
  <div class="belk-flex"
    :variant="variant">
    <slot></slot>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkFlex',

  props: {
    variant: {
      type: String,
      default: 'default',
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>

<style lang="scss" src="../style/toolbar.scss"></style>
<style lang="scss" src="../style/buttons.scss"></style>
