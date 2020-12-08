<template>
  <div class="sh-nav-item"
    v-bind:class="{ 'touch': mobile }"
    :active="active">
    <div class="popper-target" :class="{ active: showPopper }" ref="target">
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
        <div class="popper-arrow" v-if="hasPointer" data-popper-arrow></div>
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
  name: 'NavItem',
  props: {
    variant: {
      type: String,
      default: 'default',
    },
    hasArrow: {
      type: Boolean,
      default: false,
    },
    delayOnMouseOver: {
      type: Number,
      default: 250,
    },
    delayOnMouseOut: {
      type: Number,
      default: 250,
    },
    disabled: {
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
    forceShow: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: 'fade',
    },
    stopPropagation: {
      type: Boolean,
      default: false,
    },
    preventDefault: {
      type: Boolean,
      default: false,
    },
    foregroundSelector: {
      type: String,
      default: '',
    },
    trigger: {
      type: String,
      default: 'click',
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
      hasPointer: true,
      currentPlacement: '',
      content: 'empty',
      popperOptions: {
        modifiers: [
          {
            name: 'flip',
            options: {
              enabled: false,
              fallbackPlacements: ['bottom'],
            },
          },
          {
            name: 'offset',
            options: {
              offset: [10, 0],
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
        this.$bus.$emit('show-curtain', this.foreground);
        if (this.link) this.link.setAttribute('aria-expanded', true);
      } else {
        this.$bus.$emit('popper-closing', this);
        this.$bus.$emit('hide-curtain', this);
        if (this.link) this.link.setAttribute('aria-expanded', false);
      }
    },

    forceShow: {
      handler(value) {
        this[value ? 'show' : 'close']();
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
    if (this.variant !== 'default') this.hasPointer = false;
    console.log(this, this.variant, this.hasPointer);
  },

  mounted() {
    this.referenceElm = this.$refs.target;
    this.popper = this.$refs.popper;
    this.link = this.referenceElm.querySelector('a');
    if (this.foregroundSelector) this.foreground = document.querySelector(this.foregroundSelector);

    if (this.link) {
      this.link.setAttribute('aria-haspopup', true);
      this.link.setAttribute('aria-expanded', false);
      if (this.hasArrow) this.link.innerHTML += '<belk-icon name="arrow-down" width="10" class="margin-l-atomic"></belk-icon>';
    }

    if (this.trigger === 'click') {
      const ref = this.$el.querySelector('.reference a');
      if (ref) {
        ref.addEventListener('click', (e) => {
          e.preventDefault();
        });
      }
    }

    this.initPopper();
  },

  methods: {
    events() {
      const self = this;
      // this.$bus.$on('show-nav', (which) => {
      //   if (which !== self.uuid) self.close();
      // });

      this.$bus.$on('breakpoint-mobile', () => {
        self.mobile = true;
      });

      this.$bus.$on('breakpoint-desktop', () => {
        self.mobile = false;
      });

      this.$bus.$on('popper-opening', (el) => {
        if (el === this) return;
        self.close();
      });
    },

    initPopper() {
      switch (this.trigger) {
        case 'click':
          on(this.referenceElm, 'click', this.doToggle);
          on(document, 'click', this.handleDocumentClick);
          break;
        case 'hover':
          on(this.referenceElm, 'mouseover', this.mouseoverHandler);
          on(this.referenceElm, 'focus', this.mouseoverHandler);
          on(this.popper, 'mouseover', this.mouseoverHandler);
          on(this.popper, 'focus', this.mouseoverHandler);
          on(this.referenceElm, 'mouseout', this.mouseoutHandler);
          on(this.referenceElm, 'blur', this.mouseoutHandler);
          on(this.popper, 'mouseout', this.mouseoutHandler);
          on(this.popper, 'blur', this.mouseoutHandler);
          break;
        default:
          // do nothing
          break;
      }
    },

    activate() {
      this.active = !this.active;
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

    show() {
      this.showPopper = true;
    },

    close() {
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

    updatePopper() {
      const test = this.popperJS
        ? this.popperJS.update()
        : this.createPopper();
      return test;
    },

    mouseoverHandler() {
      if (!this.mobile) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.$bus.$emit('popper-opening', this);
          this.$set(this, 'showPopper', true);
        }, this.delayOnMouseOver);
      }
    },

    mouseoutHandler() {
      if (!this.mobile) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopper = false;
        }, this.delayOnMouseOut);
      }
    },

    handleDocumentClick(e) {
      if (!this.$el || !this.referenceElm
          || this.elementContains(this.$el, e.target)
          || this.elementContains(this.referenceElm, e.target)
          || !this.popper || this.elementContains(this.popper, e.target)
      ) {
        return;
      }

      this.$emit('documentClick', this);

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
