<template>
  <div class="belk-nav">
    <slot name="test">{{ msg }}</slot>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkNav',

  props: {
    msg: {
      type: String,
      default: 'new',
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
