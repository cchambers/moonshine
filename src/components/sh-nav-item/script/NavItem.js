import Popper from '../../../assets/script/popper';

function on(element, event, handler) {
  if (element && event && handler) {
    document.addEventListener ? element.addEventListener(event, handler, false) : element.attachEvent('on' + event, handler);
  }
}

function off(element, event, handler) {
  if (element && event) {
    document.removeEventListener ? element.removeEventListener(event, handler, false) : element.detachEvent('on' + event, handler)
  }
}

export default {
  name: 'NavItem',
  props: {
    delayOnMouseOver: {
      type: Number,
      default: 10,
    },
    delayOnMouseOut: {
      type: Number,
      default: 10,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    enterActiveClass: String,
    leaveActiveClass: String,
    boundariesSelector: {
      type: String,
      default: '.documentation'
    },
    forceShow: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: ''
    },
    stopPropagation: {
      type: Boolean,
      default: false
    },
    preventDefault: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      active: false,
      referenceElm: null,
      popperJS: null,
      showPopper: false,
      mobile: false,
      currentPlacement: '',
      content: 'empty',
      popperOptions: {
        modifiers: {
          flip: {
            behavior: ['bottom']
          },
          computeStyle: {
            x: 'left'
          },
          preventOverflow: {
            padding: 0,
            priority: ['left']
          }
        }
      }
    };
  },

  watch: {
    showPopper(value) {
      if (value) {
        this.$emit('show-mega-nav', this);
        if (this.popperJS) this.popperJS.enableEventListeners();
        this.updatePopper();
      } else {
        if (this.popperJS) this.popperJS.disableEventListeners();
        this.$emit('hide-mega-nav', this);
      }
    },

    forceShow: {
      handler(value) {
        this[value ? 'show' : 'close']();
      },
      immediate: true
    },

    disabled(value) {
      if (value) {
        this.showPopper = false;
      }
    }
  },

  mounted() {
    this.referenceElm = this.$refs.target;
    this.popper = this.$refs.popper;

    this.initPopper();
  },

  methods: {
    events() {
      this.$bus.$on('show-nav', (which) => {
        if (which !== this.uuid) this.close();
      });

      this.$bus.$on('breakpoint-mobile', () => {
        this.mobile = true;
      });

      this.$bus.$on('breakpoint-desktop', () => {
        this.mobile = false;
      });

    },

    initPopper() {
      // on(this.referenceElm, 'click', this.doToggle);
      // on(document, 'click', this.handleDocumentClick);
      on(this.referenceElm, 'mouseover', this.mouseoverHandler);
      on(this.referenceElm, 'focus', this.mouseoverHandler);
      on(this.popper, 'mouseover', this.mouseoverHandler);
      on(this.popper, 'focus', this.mouseoverHandler);
      on(this.referenceElm, 'mouseout', this.mouseoutHandler);
      on(this.referenceElm, 'blur', this.mouseoutHandler);
      on(this.popper, 'mouseout', this.mouseoutHandler);
      on(this.popper, 'blur', this.mouseoutHandler);
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
      if (this.showPopper) return;

      if (this.popperJS) {
        this.popperJS.destroy();
        this.popperJS = null;
      }
    },

    createPopper() {
      this.$nextTick(() => {

        if (this.popperJS && this.popperJS.destroy) {
          this.popperJS.destroy();
        }

        if (this.boundariesSelector) {
          const boundariesElement = document.querySelector(this.boundariesSelector) || document.querySelector('#main');

          if (boundariesElement) {
            this.popperOptions.modifiers = Object.assign({

            }, this.popperOptions.modifiers);
            this.popperOptions.modifiers.preventOverflow = Object.assign({}, this.popperOptions.modifiers.preventOverflow);
            this.popperOptions.modifiers.preventOverflow.boundariesElement = boundariesElement;
          }
        }

        this.popperOptions.onCreate = () => {
          this.$emit('created', this);
          this.$nextTick(this.updatePopper);
        };

        this.popperJS = new Popper(this.referenceElm, this.popper, this.popperOptions);
      });
    },

    destroyPopper() {
      off(this.referenceElm, 'click', this.doToggle);
      off(this.referenceElm, 'mouseup', this.close);
      off(this.referenceElm, 'mousedown', this.show);
      off(this.referenceElm, 'focus', this.show);
      off(this.referenceElm, 'blur', this.close);
      off(this.referenceElm, 'mouseout', this.mouseoutHandler);
      off(this.referenceElm, 'mouseover', this.mouseoverHandler);
      off(document, 'click', this.handleDocumentClick);

      this.showPopper = false;
      this.doDestroy();
    },

    updatePopper() {
      this.popperJS ? this.popperJS.scheduleUpdate() : this.createPopper();
    },

    mouseoverHandler() {
      if (!this.mobile) {
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
          this.$bus.$emit('show-nav', this.uuid);
          this.showPopper = true;
        }, this.delayOnMouseOver);
      }
    },

    mouseoutHandler() {
      if (!this.mobile) {
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
          this.showPopper = false;
        }, this.delayOnMouseOut);
      }
    },

    handleDocumentClick(e) {
      if (!this.$el || !this.referenceElm ||
        this.elementContains(this.$el, e.target) ||
        this.elementContains(this.referenceElm, e.target) ||
        !this.popper || this.elementContains(this.popper, e.target)
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
    }
  },

  destroyed() {
    this.destroyPopper();
  }
}