<template>
  <div class="sh-masonry"
    :variant="variant">
    <div class="masonry-grid" ref="grid"><slot></slot></div>
  </div>
</template>

<script>
import Masonry from 'masonry-layout';
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Masonry',

  props: {
    variant: {
      type: String,
      default: 'default',
    },
    selector: {
      type: String,
      default: '.grid-item',
    },
    columnWidth: {
      type: Number,
      default: 200,
    },
    gridHeight: {
      type: String,
      default: '100vh',
    },
    horizontalOrder: {
      type: Boolean,
    },
  },

  data() {
    return {
      msnry: null,
    };
  },

  mounted() {
    const el = this.$refs.grid;
    this.msnry = new Masonry(el, {
      itemSelector: this.selector,
      columnWidth: this.columnWidth,
      horizontalOrder: this.horizontalOrder,
    });
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
