<template>
  <button ref="button" :class="{ active: isActive }"
    :type="type"
    v-on:keyup.enter="tapHandler"
    :close-trigger="closeTrigger"
    :print-trigger="printTrigger"
    :value="value"
    :name="name"
    :id="uniqueId"
    :form="form"
    :formaction="formaction"
    :formmethod="formmethod"
    :formtarget="formtarget"
    :disabled="isDisabled"
    v-bind:role="ariaRole"
    v-bind:aria-selected="isActive"
    v-bind:aria-controls="ariaControls"
    class="sh-button">
    <div v-if="beforeIcon" class="button-icon before">
      <belk-icon :name="beforeIcon" height="18" width="18"></belk-icon>
    </div>
    <slot name="before-text"></slot>
    <div class="active-icon margin-r-micro"
      v-if="activeIcon"><belk-icon width="20" height="20"
      :name="activeIcon"></belk-icon></div>
    <div class="actual-text"><slot></slot></div>
    <div class="active-text" v-if="isActive"><span>{{activeText}}</span></div>
    <slot name="after-text"></slot>
    <div v-if="icon" class="button-icon after">
      <belk-icon :name="icon" height="13" width="13"></belk-icon>
    </div>
  </button>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Button',

  props: {
    ajax: String,
    ajaxSuccess: String,
    variant: {
      type: String,
      default: 'default',
    },
    activeText: String,
    activeIcon: String,
    beforeIcon: String,
    icon: String,
    group: String,
    closeTrigger: Boolean,
    printTrigger: Boolean,
    toggle: String,
    round: String,
    outline: Boolean,
    clickEvent: String,
    active: Boolean,
    link: String,
    size: String,
    target: String,
    ariaControls: String,
    value: String,
    name: String,
    type: {
      type: String,
      default: 'button',
    },
    form: String,
    formaction: String,
    formmethod: String,
    formtarget: String,
    disabled: Boolean,
    autofocus: Boolean,
    uniqueId: String,
  },

  data() {
    return {
      isActive: false,
      emitData: null,
      buttonEl: this.$refs.button,
      isRole: false,
      once: false,
      ariaRole: '',
      isDisabled: false,
    };
  },

  created() {
    if (this.link) this.ariaRole = 'link';
    if (this.disabled) this.isDisabled = true;
  },

  mounted() {
    this.buttonEl = this.$refs.button;
    if (this.active) this.isActive = true;
    if (this.ariaRole) this.isRole = this.ariaRole;

    this.buttonEl.addEventListener('click', this.tapHandler);
    this.$bus.$on(`${this.uniqueId}-button-toggle`, this.doToggle);

    const innerButton = this.$refs.button.querySelector('button');
    if (innerButton) {
      const actualText = innerButton.querySelector('.actual-text');
      this.$refs.button.innerHTML = actualText.outerHTML;
    }
  },

  methods: {
    events() {
      const self = this;
      if (self.group) {
        self.$bus.$on('group-toggle', (data) => {
          if (data.group === self.group) self.groupHandler(data);
        });
      }

      self.$bus.$on('button-toggle', (data) => {
        if (data.which === this.uniqueId) this.doToggle();
      });
    },

    groupHandler(data) {
      if (data.el === this) return;
      this.isActive = false;
    },

    tapHandler(e) {
      if (this.isDisabled) return;
      // this.ripple(e);
      if (this.ajax) {
        this.isDisabled = true;
        this.sendRequest();
      }
      if (this.toggle && !this.ajax) this.doToggle();
      if (this.clickEvent) {
        if (e) e.preventDefault();
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
      if (this.link) {
        if (this.target) {
          window.open(this.link, this.target);
        } else {
          window.location.href = this.link;
        }
      }
    },

    sendRequest() {
      const url = this.ajax;
      fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      })
        .then((response) => response.json())
        .then((data) => {
          if (this.ajaxSuccess) {
            this.$bus.$emit(this.ajaxSuccess, data);
          } else if (this.toggle) this.doToggle();
          this.isDisabled = false;
        })
        .catch((error) => {
          this.log(error, 1);
          this.isDisabled = false;
        });
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
<style lang="scss" src="../style/belk-link.scss"></style>
