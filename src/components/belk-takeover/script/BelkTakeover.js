import ComponentPrototype from '../../component-prototype';
import Popper from '../../../assets/script/popper';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkTakeover',

  props: {
    variant: {
      type: String,
      default: 'default'
    },

    sticky: {
      type: Boolean,
      default: false
    },

    placement: {
      type: String,
      default: 'left-start'
    },
    delay: {
      type: Number,
      default: 200
    },
    attachTo: {
      type: String,
      default: '.documentation.contain'
    },
    scrollWith: {
      type: String,
      default: 'main'
    }
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
      poppers: []
    }
  },


  mounted() {
    let self = this;
    this.referenceEl = document.querySelector(this.attachTo);
    this.scrollingEl = document.querySelector(this.scrollWith) || 'viewport';
    this.popperLeft = this.$refs.popperLeft;
    this.popperRight = this.$refs.popperRight;
    let IE11 = document.getElementsByTagName('html')[0].classList.contains('IE11');

    if (this.sticky && !IE11) {

      // move/stick elements
      this.popperLeft.classList.add('is-sticky', 'popper-left');
      this.popperRight.classList.add('is-sticky', 'popper-right');

      let leftAnchor = document.createElement('div');
      leftAnchor.classList.add('takeover-anchor-left')
      leftAnchor.append(this.popperLeft);

      let rightAnchor = document.createElement('div');
      rightAnchor.classList.add('takeover-anchor-right');
      rightAnchor.append(this.popperRight);

      this.referenceEl.prepend(leftAnchor);
      this.referenceEl.prepend(rightAnchor);
      

      setTimeout(() => {
        self.$el.classList.add('active');
      }, this.delay);

    } else {
      
      this.poppers.push(new Popper(this.referenceEl, this.popperLeft, this.opts('left-start')));
      this.poppers.push(new Popper(this.referenceEl, this.popperRight, this.opts('right-start')));

      setTimeout(() => {
        self.$el.classList.add('active');
        self.$nextTick(self.updatePopper);
      }, this.delay);

      this.poppers.forEach((el) => {
        el.enableEventListeners();
      })

    }

  },

  methods: {
    updatePopper() {
      if (this.poppers.length) {
        this.poppers.forEach((popper) => {
          popper.scheduleUpdate();
        })
      }
    },

    opts(pos) {
      let self = this;
      return {
        placement: pos,
        modifiers: {
          preventOverflow: {
            boundariesElement: self.scrollingEl,
            priority: ['top'],
            padding: 0
          },
          flip: {
            behavior: [pos]
          }
        },
        onCreate: () => {
          self.$emit('created', self);
          self.$nextTick(self.updatePopper);
        }
      }
    }
  },


}