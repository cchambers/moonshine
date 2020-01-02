<template>
  <a class="sh-link"
    :href="href"
    :target="target"
    :variant="variant">
    <slot></slot>
  </a>
</template>

<script>
import ComponentPrototype from '../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Link',

  props: {
    href: {
      type: String,
      default: '#',
    },
    target: {
      type: String,
    },
  },
};
</script>
<style lang="scss" src="./style/default.scss"></style>
<style lang="scss" src="./style/primary.scss"></style>
