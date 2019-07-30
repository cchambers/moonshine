
export default {
  name: 'BelkMegaNav',
  props: {
    disableCurtain: Boolean
  },

  data() {
    return {
      active: false,
      mobile: false,
      curtain: true
    }
  },

  mounted() {
    this.windowWatcher();

    if (this.disableCurtain) this.curtain = false;
  },
  
  methods: {
    events() {
      this.$bus.$on('curtain-hiding', () => {
        if (this.active) this.hide();
      });

      window.addEventListener('resize', this.windowWatcher);
    },

    windowWatcher() {
      let _w = window.innerWidth;
      if (_w < 800) {
        if (!this.mobile) {
          this.mobile = true;
          this.$bus.$emit('breakpoint-mobile');
        }
      } else {
        if (this.mobile) {
          this.mobile = false;
          if (this.active) this.hide();
          this.$bus.$emit('breakpoint-desktop');
        }
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
    }
  },

}