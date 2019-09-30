
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkMegaNav',
  props: {
    disableCurtain: Boolean,
  },

  data() {
    return {
      root: {},
      active: false,
      mobile: false,
      curtain: true,
    };
  },

  mounted() {
    this.root = this.$el.closest('belk-header');
    this.windowWatcher();

    if (this.disableCurtain) this.curtain = false;
  },

  methods: {
    events() {
      this.$bus.$on('curtain-hiding', () => {
        if (this.active) this.hide();
      });

      this.$bus.$on('show-nav', this.mouseoverHandler);

      window.addEventListener('resize', this.windowWatcher);
    },

    windowWatcher() {
      const _w = window.innerWidth;
      if (_w < 768) {
        if (!this.mobile) {
          this.mobile = true;
          this.$bus.$emit('breakpoint-mobile');
        }
      } else if (this.mobile) {
        this.mobile = false;
        if (this.active) this.hide();
        this.$bus.$emit('breakpoint-desktop');
      }
    },

    mouseoverHandler() {
      if (this.curtain && !this.mobile) this.$bus.$emit('show-curtain', this.root);
    },

    mouseleaveHandler() {
      if (this.curtain && !this.mobile) {
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
          this.$bus.$emit('hide-curtain');
        }, 400);
      }
    },

    toggleActive() {
      if (this.active) {
        this.hide();
      } else {
        this.show();
      }
    },

    hide() {
      this.active = false;
      if (this.curtain) this.$bus.$emit('hide-curtain');
    },

    show() {
      this.active = true;
      if (this.curtain) this.$bus.$emit('show-curtain');
    },
  },

};
