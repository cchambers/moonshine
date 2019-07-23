export default {
  name: 'BelkHeader',
  props: {
    msg: {
      type: String,
      default: 'new component'
    }
  },

  data() {
    return {
      snapping: false
    }
  },
  
  methods: {
    events() {
      this.$bus.on('mega-nav-opening');
    }
  },

}