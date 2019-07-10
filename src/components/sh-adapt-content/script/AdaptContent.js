export default {
  name: 'AdaptContent',
  props: {
    sm: String,
    md: String,
    lg: String,
    xl: String,
    elementLevel: Boolean,
    uniqueId: String
  },

  data() {
    return {
      id: String,
      snapping: false,
      smContent: String,
      mdContent: String,
      lgContent: String,
      xlContent: String,
      smPoint: {
        type: Number,
        default: 400
      },
      mdPoint: {
        type: Number,
        default: 768
      },
      lgPoint: {
        type: Number,
        default: 960
      },
      xlPoint: {
        type: Number,
        default: 1280
      },
      resizeTimer: 0
    }
  },
  
  methods: {
    resizeHandler() {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(this.checkState, 50);
    },

    checkState() {
      if (this.elementLevel) {
        let width = this.$el.parentNode.outerWidth;
        console.log(width)
      } 
    }
  },

  mounted() {
    if (this.uniqueId) {
      this.id = this.uniqueId;
    } else {
      this.id = `ac-${this.uuid}`;
    }
  }
}