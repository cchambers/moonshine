export default {
  name: 'Content',
  data() {
    return {
      pageData: {
        type: Object,
        default: {
          name: 'NO'
        }
      }
    }
  },

  mounted() {
    let path = location.pathname;
    if (path.match('component')) {
      let which = path.split('/components/')[1];
      if (window.components[which]) {
        this.pageData = window.components[which];
      }
    }
  }
}