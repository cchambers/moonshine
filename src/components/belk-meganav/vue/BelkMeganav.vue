<template>
  <div class="belk-meganav"
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

  name: 'BelkMeganav',

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

    /* REMOVE THESE METHODS */
    snap() {
      if (!this.snapping) {
        this.snapping = true;
        this.snapTimeout = setTimeout(this.recover, 1500);
        this.$emit('snapping');
      }
    },

    recover() {
      this.halve();
      this.snapping = false;
      this.$emit('snapped');
    },

    halve() {
      const str = this.$el.innerText;
      if (!str.length) return;
      const middle = Math.ceil(str.length / 2);
      const half = str.slice(0, middle);
      this.$el.innerText = half.trim();
    },
    /* END REMOVE */

  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
