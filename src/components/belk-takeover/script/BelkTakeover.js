import { createPopper as CreatePopper } from '@popperjs/core';
// import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';
// import flip from '@popperjs/core/lib/modifiers/flip';
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkTakeover',

  props: {
    variant: {
      type: String,
      default: 'default',
    },

    sticky: {
      type: Boolean,
      default: false,
    },

    placement: {
      type: String,
      default: 'left-start',
    },
    delay: {
      type: Number,
      default: 200,
    },
    attachTo: {
      type: String,
      default: '.documentation.contain',
    },
    scrollWith: {
      type: String,
      default: 'main',
    },
  },

  data() {
    return {
      active: false,
      referenceEl: {},
      scrollingEl: {},
      popperJS: null,
      showPopper: false,
      mobile: false,
      currentPlacement: '',
      poppers: [],
    };
  },

  mounted() {
    const self = this;
    this.referenceEl = document.querySelector(this.attachTo);
    this.scrollingEl = document.querySelector(this.scrollWith) || 'viewport';
    this.popperLeft = this.$refs.popperLeft;
    this.popperRight = this.$refs.popperRight;

    if (this.sticky) {
      // move/stick elements
      this.popperLeft.classList.add('is-sticky', 'popper-left');
      this.popperRight.classList.add('is-sticky', 'popper-right');

      const leftAnchor = document.createElement('div');
      leftAnchor.classList.add('takeover-anchor-left');
      leftAnchor.append(this.popperLeft);

      const rightAnchor = document.createElement('div');
      rightAnchor.classList.add('takeover-anchor-right');
      rightAnchor.append(this.popperRight);

      this.referenceEl.prepend(leftAnchor);
      this.referenceEl.prepend(rightAnchor);

      setTimeout(() => {
        self.$el.classList.add('active');
      }, this.delay);
    } else {
      const left = new CreatePopper(this.referenceEl, this.popperLeft, this.opts('left-start'));
      const right = new CreatePopper(this.referenceEl, this.popperRight, this.opts('right-start'));
      this.poppers.push([left, right]);

      setTimeout(() => {
        self.$el.classList.add('active');
        self.$nextTick(self.updatePopper);
      }, this.delay);

      // this.poppers.forEach((el) => {
      //   el.enableEventListeners();
      // });
    }

    document.documentElement.classList.add('takeover-active');
  },

  methods: {
    updatePopper() {
      if (this.poppers.length) {
        this.poppers.forEach((popper) => {
          if (typeof popper.update === 'function') {
            popper.forceUpdate();
          } else {
            this.log('update still unavailable');
          }
        });
      }
    },

    opts(pos) {
      const self = this;
      return {
        modifiers: [{
          name: 'flip',
          options: {
            enabled: true,
            behavior: [pos],
          },
        },
        {
          name: 'placement',
          options: pos,
        },
        {
          name: 'preventOverflow',
          options: {
            boundariesElement: self.scrollingEl,
            priority: ['top'],
            padding: 0,
          },
        },
        ],
        onFirstUpdate: () => {
          self.$emit('created', self);
          self.$nextTick(self.updatePopper);
        },
      };
    },
  },

};
