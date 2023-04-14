<template>
  <div class="sh-checkbox" :variant="variant">
    <input
      hidden
      :id="inputId"
      type="checkbox"
      ref="input"
      @change="handleChange">
    <label :for="inputId"
        tabindex="0"
        v-on:keyup.enter="toggle"
        v-on:keyup.space="toggle">
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
    align: String,
    toggleEvent: String,
    toggleOnEvent: String,
    toggleOffEvent: String,
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
    events() {
      console.log('x', this.uniqueId);
      this.$bus.$on(`reset-checkbox-${this.uniqueId}`, () => {
        console.log('trying');
        this.toggleOff();
      }, 1000);
      this.$bus.$on(`toggle-checkbox-${this.uniqueId}`, this.toggleOn);
    },
    toggle() {
      this.isChecked = !this.isChecked;
      this.handleChange();
    },
    toggleOff() {
      this.isChecked = false;
      this.handleChange();
    },
    toggleOn() {
      this.isChecked = true;
      this.handleChange();
    },
    handleChange(event = true) {
      this.$refs.input.checked = this.isChecked;
      if (event) {
        this.$bus.$emit('checkbox-changed', {
          id: this.uniqueId,
          checked: this.isChecked,
        });
      }
      if (this.toggleEvent) this.$bus.$emit(this.toggleEvent);
      if (this.toggleOnEvent && this.isChecked) this.$bus.$emit(this.toggleOnEvent);
      if (this.toggleOffEvent && !this.isChecked) this.$bus.$emit(this.toggleOffEvent);
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
