export default {
  name: 'BelkHeader',

  data() {
    return {
      bagEl: {},
      searchExpanded: 'searchExpanded'
    }
  },

  mounted() {
    this.bagEl = this.$refs.bag;
  },
  
  methods: {
    events() {
      this.$bus.$on('mega-nav-opening');
    },
    toggleSearch(){
      let formerValue = this.searchExpanded;
      this.searchExpanded = formerValue === 'searchExpanded' ? '' : 'searchExpanded';
    },
    closeSearch() {
      this.searchExpanded = '';
    }
  },

}