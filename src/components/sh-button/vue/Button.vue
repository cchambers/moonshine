<template>
  <button ref="button" :class="{ active: isActive }"
    v-on:keyup.enter="tapHandler"
    :close-trigger="closeTrigger"
    v-hammer:tap="tapHandler"
    :value="defaultValue"
    class="sh-button">
    <slot name="before-text"></slot>
    <slot></slot>
    <slot name="after-text"></slot>
  </button>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Button',

  props: {
    variant: {
      type: String,
      default: 'default',
    },
    group: String,
    closeTrigger: Boolean,
    toggle: Boolean,
    round: String,
    outline: Boolean,
    clickEvent: String,
    defaultValue: String,
    active: Boolean,
  },

  data() {
    return {
      isActive: false,
      emitData: null,
      buttonEl: this.$refs.button,
    };
  },

  mounted() {
    this.buttonEl = this.$refs.button;
    if (this.active) this.isActive = true;
  },

  methods: {
    events() {
      const self = this;
      if (self.group) {
        self.$bus.$on('group-toggle', (data) => {
          if (data.group === self.group) self.groupHandler(data);
        });
      }
    },

    groupHandler(data) {
      if (data.el === this) return;
      this.isActive = false;
    },

    tapHandler(e) {
      this.ripple(e);
      if (this.toggle) this.doToggle();
      if (this.clickEvent) {
        this.$bus.$emit(this.clickEvent, {
          el: this,
          value: this.buttonEl.value,
        });
        e.preventDefault();
      }
      if (this.group) {
        this.$bus.$emit('group-toggle', {
          el: this,
          group: this.group,
        });
      }
    },

    ripple(e) {
      const ripple = document.createElement('div');
      ripple.classList.add('ripple');
      const rect = e.target.getBoundingClientRect();
      const x = (e.center) ? e.center.x - rect.left - 5 : this.$el.outerWidth / 2;
      const y = (e.center) ? e.center.y - rect.top - 5 : this.$el.outerHeight / 2;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      this.$el.prepend(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 1400);
    },

    doToggle() {
      if (this.group && this.isActive) return;
      this.isActive = !this.isActive;
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
<style lang="scss" src="../style/secondary.scss"></style>
<style lang="scss" src="../style/tertiary.scss"></style>
