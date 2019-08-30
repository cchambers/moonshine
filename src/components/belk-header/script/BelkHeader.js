export default {
  name: 'BelkHeader',

  data() {
    return {
      bagEl: {},
      navEl: {},
      data: {}
    }
  },

  watch: {
    data(val) {
      // this.$bus.$emit('BRD-VALUE', val.BRD);
    }
  },

  mounted() {
    this.bagEl = this.$refs.bag;
    this.navEl = this.$refs.meganav;
    // this.data = window.pageData;
  },
  
  methods: {
    events() {
      this.$bus.$on('mega-nav-opening');
    },

    menuHandler() {
      this.navEl.show();
    },
  },
}