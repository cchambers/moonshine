export default {
  name: 'LibSectionLinks',
  data() {
    return {
      active: false,
      html: '',
    }
  },
  
  mounted() {
    this.$bus.$on('section-links', this.updateHTML)
  },

  methods: {
    updateHTML(html) {
      this.html = html;
    }
  }
}