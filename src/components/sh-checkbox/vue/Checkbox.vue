<template>
  <div class="sh-checkbox" :variant="variant">
    <input
      hidden
      :id="inputId"
      type="checkbox"
      :checked="checked">
    <label :for="inputId">
      <div class="toggle"></div>
      <div class="label-text">
        <slot name="label">{{ label }}</slot>
      </div>
    </label>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';
import InputPrototype from '../../input-prototype';

export default {
  mixins: [ComponentPrototype, InputPrototype],

  name: 'Checkbox',

  props: {
    checked: {
      type: Boolean,
    },
  },

  created() {
    this.inputId = this.uniqueId || this.makeUUID();
  },

  methods: {},
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
