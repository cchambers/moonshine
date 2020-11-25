<template>
  <div class="sh-popper"
    v-bind:class="{ 'touch': mobile }"
    :active="active">
    <div class="popper-target" ref="target">
      <div class="reference">
        <slot name="reference"></slot>
      </div>
    </div>
    <transition
    :name="transition"
    @after-leave="doDestroy">
      <div
        class="popper-actual"
        :fill="fill"
        ref="popper"
        v-show="!disabled && showPopper">
        <div class="popper-content">
          <slot name="content">{{ content }}</slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { createPopper as CreatePopper } from '@popperjs/core';
import ComponentPrototype from '../../component-prototype';

function on(element, event, handler) {
  if (element && event && handler) {
    if (document.addEventListener) {
      element.addEventListener(event, handler, false);
    } else {
      element.attachEvent(`on${event}`, handler);
    }
  }
}

function off(element, event, handler) {
  if (element && event) {
    if (document.removeEventListener) {
      element.removeEventListener(event, handler, false);
    } else {
      element.detachEvent(`on${event}`, handler);
    }
  }
}

export default {
  mixins: [ComponentPrototype],
  name: 'Popper',
  props: {
    variant: {
      type: String,
      default: 'default',
    },
    trigger: {
      type: String,
      default: 'hover',
      validator: (value) => [
        'clickToOpen',
        'click', // Same as clickToToggle, provided for backwards compatibility.
        'clickToToggle',
        'hover',
        'focus',
      ].indexOf(value) > -1,
    },
    delayOnMouseOver: {
      type: Number,
      default: 200,
    },
    delayOnMouseOut: {
      type: Number,
      default: 200,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hasCurtain: {
      type: Boolean,
      default: false,
    },
    fill: {
      type: Boolean,
      default: false,
    },
    boundariesSelector: {
      type: String,
      default: '.documentation',
    },
    reference: {},
    forceShow: {
      type: Boolean,
      default: false,
    },
    dataValue: {
      default: null,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    visibleArrow: {
      type: Boolean,
      default: true,
    },
    transition: {
      type: String,
      default: '',
    },
    stopPropagation: {
      type: Boolean,
      default: false,
    },
    preventDefault: {
      type: Boolean,
      default: false,
    },
    offsetX: 0,
    offsetY: 0,
    placement: {
      type: String,
      default: 'bottom',
    },
  },

  data() {
    return {
      active: false,
      foreground: null,
      referenceElm: null,
      popperJS: null,
      showPopper: false,
      mobile: false,
      content: 'empty',
      popperOptions: {
        modifiers: [
          {
            name: 'flip',
            options: {
              enabled: true,
              fallbackPlacements: ['top', 'bottom'],
            },
          },
          {
            name: 'offset',
            options: {
              offset: [this.offsetX, (this.offsetY || null)],
            },
          },
          {
            name: 'preventOverflow',
            options: {
              padding: 0,
              priority: ['top', 'bottom'],
            },
          },
        ],
      },
    };
  },

  watch: {
    showPopper(value) {
      if (value) {
        this.$bus.$emit('popper-opening', this);
        if (this.popperJS) this.popperJS.enableEventListeners();
        this.updatePopper();
        if (this.hasCurtain) this.$bus.$emit('show-curtain', this.$refs.target);
        if (this.link) this.link.setAttribute('aria-expanded', true);
        this.$bus.$emit('popper-opened', this);
      } else {
        this.$bus.$emit('popper-closing', this);
        if (this.hasCurtain) this.$bus.$emit('hide-curtain', this);
        if (this.link) this.link.setAttribute('aria-expanded', false);
        this.$bus.$emit('popper-closed', this);
      }
    },

    forceShow: {
      handler(value) {
        this[value ? 'doShow' : 'doClose']();
      },
      immediate: true,
    },

    disabled(value) {
      if (value) {
        this.showPopper = false;
      }
    },
  },

  created() {
    this.appendedArrow = false;
    this.appendedToBody = false;
    this.popperOptions.placement = this.placement;
    this.setUUID();
  },

  mounted() {
    this.ready();
  },

  methods: {
    events() {
      const self = this;
      self.$bus.$on('popper-opening', (el) => {
        if (el === self) return;
        self.close();
      });

      self.$bus.$on('breakpoint-mobile', () => {
        self.mobile = true;
      });

      self.$bus.$on('breakpoint-desktop', () => {
        self.mobile = false;
      });
    },

    ready() {
      if (typeof this.reference === 'string') {
        this.referenceElm = document.querySelector(this.reference);
      }
      if (this.$slots.reference) {
        this.referenceElm = this.referenceElm || this.$slots.reference[0].elm;
      }
      this.popper = this.$refs.popper;
      switch (this.trigger) {
        case 'click':
          on(this.referenceElm, 'click', this.doToggle);
          on(document, 'click', this.handleDocumentClick);
          break;
        case 'hover':
          on(this.referenceElm, 'mouseover', this.onMouseOver);
          on(this.referenceElm, 'focus', this.onMouseOver);
          on(this.popper, 'mouseover', this.onMouseOver);
          on(this.popper, 'focus', this.onMouseOver);
          on(this.referenceElm, 'mouseout', this.onMouseOut);
          on(this.referenceElm, 'blur', this.onMouseOut);
          on(this.popper, 'mouseout', this.onMouseOut);
          on(this.popper, 'blur', this.onMouseOut);
          break;
        default:
          break;
      }
    },

    doToggle(event) {
      if (this.stopPropagation) {
        event.stopPropagation();
      }

      if (this.preventDefault) {
        event.preventDefault();
      }

      if (!this.forceShow) {
        this.showPopper = !this.showPopper;
      }
    },

    doShow() {
      this.showPopper = true;
    },

    doClose() {
      this.showPopper = false;
    },

    doDestroy() {
      if (this.showPopper) {
        return;
      }

      if (this.popperJS) {
        this.popperJS.destroy();
        this.popperJS = null;
      }

      if (this.appendedToBody) {
        this.appendedToBody = false;
        document.body.removeChild(this.popper.parentElement);
      }
    },

    createPopper() {
      this.$nextTick(() => {
        if (this.visibleArrow) {
          this.appendArrow(this.popper);
        }

        if (this.appendToBody && !this.appendedToBody) {
          this.appendedToBody = true;
          document.body.appendChild(this.popper.parentElement);
        }

        if (this.popperJS && this.popperJS.destroy) {
          this.popperJS.destroy();
        }

        this.popperOptions.onFirstUpdate = () => {
          this.$bus.$emit('created', this);
          this.$nextTick(this.updatePopper);
        };

        this.popperJS = new CreatePopper(
          this.referenceElm,
          this.popper,
          this.popperOptions,
        );
      });
    },

    destroyPopper() {
      off(this.referenceElm, 'click', this.doToggle);
      off(this.referenceElm, 'mouseup', this.doClose);
      off(this.referenceElm, 'mousedown', this.doShow);
      off(this.referenceElm, 'focus', this.doShow);
      off(this.referenceElm, 'blur', this.doClose);
      off(this.referenceElm, 'mouseout', this.onMouseOut);
      off(this.referenceElm, 'mouseover', this.onMouseOver);
      off(document, 'click', this.handleDocumentClick);

      this.showPopper = false;
      this.doDestroy();
    },

    appendArrow(element) {
      if (this.appendedArrow) {
        return;
      }

      this.appendedArrow = true;

      const arrow = document.createElement('div');
      arrow.setAttribute('data-popper-arrow', '');
      arrow.className = 'popper-arrow';
      element.appendChild(arrow);
    },

    updatePopper() {
      const test = this.popperJS
        ? this.popperJS.update()
        : this.createPopper();
      return test;
    },

    onMouseOver() {
      clearTimeout(this.mousetimer);
      this.mousetimer = setTimeout(() => {
        this.showPopper = true;
      }, this.delayOnMouseOver);
    },

    onMouseOut() {
      clearTimeout(this.mousetimer);
      this.mousetimer = setTimeout(() => {
        this.showPopper = false;
      }, this.delayOnMouseOut);
    },

    handleDocumentClick(e) {
      if (
        !this.$el
        || !this.referenceElm
        || this.elementContains(this.$el, e.target)
        || this.elementContains(this.referenceElm, e.target)
        || !this.popper
        || this.elementContains(this.popper, e.target)
      ) {
        return;
      }

      this.$bus.$emit('documentClick', this);

      if (this.forceShow) {
        return;
      }

      this.showPopper = false;
    },

    elementContains(elm, otherElm) {
      if (typeof elm.contains === 'function') {
        return elm.contains(otherElm);
      }

      return false;
    },
  },

  destroyed() {
    this.destroyPopper();
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
