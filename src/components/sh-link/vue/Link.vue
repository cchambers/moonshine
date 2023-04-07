<template>
  <a
    class="sh-link"
    :href="href"
    :target="target"
    :variant="variant"
  >
    <slot />
  </a>
</template>

<script>
import ComponentPrototype from '../../../utils/component-prototype';

export default {

  name: 'Link',
  mixins: [ComponentPrototype],

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
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
<style lang="scss" src="../style/secondary.scss"></style>
