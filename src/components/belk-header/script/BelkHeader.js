export default {
  name: 'BelkHeader',

  data() {
    return {
      bagEl: {}
    }
  },

  mounted() {
    this.bagEl = this.$refs.bag;
  },
  
  methods: {
    events() {
      this.$bus.$on('mega-nav-opening');
    }
  },

}