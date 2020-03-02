<template>
  <div class="sh-input">
    <div hidden ref="default-value"><slot></slot></div>
    <label :for="inputId"><slot name="label">{{ label }}</slot></label>
    <input type="text"
      :id="inputId"
      v-model="value"
      v-on:keyup="keyupHandler"
      class="actual" />
  </div>
</template>

<script>
import InputPrototype from '../../input-prototype';
import ComponentPrototype from '../../component-prototype';
import ValidationBehavior from '../../validation-behavior';

export default {
  mixins: [ComponentPrototype, InputPrototype, ValidationBehavior],

  name: 'Input',

  props: {
    label: String,
    defaultValue: String,
  },

  data() {
    return {
      test: 'ok',
    };
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
<style lang="scss" src="../style/primary.scss"></style>
