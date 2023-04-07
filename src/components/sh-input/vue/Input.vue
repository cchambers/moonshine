<template>
  <div class="sh-input">
    <div
      ref="default-value"
      hidden
    >
      <slot />
    </div>
    <label :for="inputId">
      <slot name="label">{{ label }}</slot>
    </label>
    <input
      :id="inputId"
      v-model="value"
      type="text"
      class="actual"
      @keyup="keyupHandler"
    >
  </div>
  <!-- <div v-if="error"></div> -->
</template>

<script>
import ComponentPrototype from '../../../utils/component-prototype';
import InputPrototype from '../../../utils/input-prototype';
import ValidationBehavior from '../../../utils/validation-behavior';

export default {

  name: 'Input',
  mixins: [ComponentPrototype, InputPrototype, ValidationBehavior],

  props: {
    label: String,
    defaultValue: String,
  },

  methods: {
    keyupHandler(e) {
      const val = e.target.value;
      this.value = val;
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
