import BelkMegaNav from '../../belk-mega-nav/vue/BelkMegaNav.vue'
import BelkSearch from '../../belk-search/vue/BelkSearch.vue'

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

  components: {
    BelkMegaNav,
    BelkSearch
  }

}