<template>
  <div class="sh-input">
    <div hidden ref="default-value">
      <slot></slot>
    </div>
    <label :for="uniqueId">
      <slot name="label">{{ label }}</slot>
    </label>
    <input :type="type" :id="uniqueId" v-model="value" v-on:keyup="keyupHandler" class="actual" />
  </div>
  <!-- <div v-if="error"></div> -->
</template>

<script>
import ComponentPrototype from '../../component-prototype';
import InputPrototype from '../../input-prototype';
import ValidationBehavior from '../../validation-behavior';

export default {
  mixins: [ComponentPrototype, InputPrototype, ValidationBehavior],

  name: 'Input',

  props: {
    label: String,
    defaultValue: String,
    uniqueId: String,
    type: {
      type: String,
      default: 'text',
    },
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
