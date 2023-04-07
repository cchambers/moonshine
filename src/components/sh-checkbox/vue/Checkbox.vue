<template>
  <div
    class="sh-checkbox"
    :variant="variant"
  >
    <input
      :id="inputId"
      hidden
      type="checkbox"
      :checked="checked"
    >
    <label :for="inputId">
      <div class="toggle" />
      <div class="label-text">
        <slot name="label">{{ label }}</slot>
      </div>
    </label>
  </div>
</template>

<script>
import ComponentPrototype from '../../../utils/component-prototype';
import InputPrototype from '../../../utils/input-prototype';

export default {

  name: 'Checkbox',
  mixins: [ComponentPrototype, InputPrototype],

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
