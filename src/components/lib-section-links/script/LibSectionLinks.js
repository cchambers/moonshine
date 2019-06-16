import { EventBus } from "../../event-bus";

export default {
  name: 'LibSectionLinks',
  data() {
    return {
      active: false,
      html: '',    }
  },
  
  mounted() {
    EventBus.$on('section-links', this.updateHTML)
  },

  methods: {
    updateHTML(html) {
      this.html = html;
    }
  }
}