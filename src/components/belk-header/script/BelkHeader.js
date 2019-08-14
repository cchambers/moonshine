export default {
  name: 'BelkHeader',

  data() {
    return {
      bagEl: {},
      navEl: {}
    }
  },

  mounted() {
    this.bagEl = this.$refs.bag;
    this.navEl = this.$refs.meganav;
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