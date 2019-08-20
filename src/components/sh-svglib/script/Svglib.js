export default {
  name: 'Svglib',
  data() {
    return {
      icons: require('../icons.json')
    }
  },

  mounted() {
    this.$bus.$on('icon-setup', this.setup);
  },

  methods: {
    setup(el) {
      console.log(el)
      el.viewbox = this.icons[el.name].viewbox
    }
  }
}