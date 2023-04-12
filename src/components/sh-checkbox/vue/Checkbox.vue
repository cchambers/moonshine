<template>
  <div class="sh-checkbox" :variant="variant">
    <input
      hidden
      :id="inputId"
      type="checkbox"
      ref="input"
      @change="handleChange"
      :checked="isChecked">
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
    toggleEvent: String,
  },

  data() {
    return {
      isChecked: false,
    };
  },

  created() {
    this.inputId = this.uniqueId || this.makeUUID();
    if (this.checked) this.isChecked = true;
  },

  methods: {
    toggle() {
      this.isChecked = !!this.isChecked;
    },
    handleChange() {
      this.$bus.$emit('checkbox-changed', {
        id: this.uniqueId,
        checked: this.isChecked,
      });
      if (this.toggleEvent) this.$bus.$emit(this.toggleEvent);
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
