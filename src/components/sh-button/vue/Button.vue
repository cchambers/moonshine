<template>
  <button ref="button" :class="{ active: isActive }"
    v-on:keyup.enter="tapHandler"
    :close-trigger="closeTrigger"
    :print-trigger="printTrigger"
    v-hammer:tap="tapHandler"
    :value="defaultValue"
    v-bind:role="ariaRole"
    v-bind:aria-selected="isActive"
    v-bind:aria-controls="ariaControls"
    class="sh-button">
    <slot name="before-text"></slot>
    <span class="active-icon"
      v-if="activeIcon"><belk-icon width="25"
      :name="activeIcon"></belk-icon></span>
    <span class="actual-text"><slot></slot></span>
    <span class="active-text" v-if="isActive">
      {{activeText}}
    </span>
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
    activeText: String,
    activeIcon: String,
    group: String,
    closeTrigger: Boolean,
    printTrigger: Boolean,
    toggle: String,
    round: String,
    outline: Boolean,
    clickEvent: String,
    defaultValue: String,
    active: Boolean,
    link: Boolean,
    ariaRole: String,
    ariaControls: String,
  },

  data() {
    return {
      isActive: false,
      emitData: null,
      buttonEl: this.$refs.button,
      isRole: false,
      once: false,
    };
  },

  created() {
    if (this.link) this.ariaRole = 'link';
  },

  mounted() {
    this.buttonEl = this.$refs.button;
    if (this.active) this.isActive = true;
    if (this.ariaRole) this.isRole = this.ariaRole;
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
        e.preventDefault();
        this.$bus.$emit(this.clickEvent, {
          el: this,
          value: this.buttonEl.value,
        });
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
      if (this.toggle === 'once' && !this.once) {
        this.once = true;
      } else {
        return;
      }
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
