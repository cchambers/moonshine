export default {
  name: 'Button',

  props: {
    closeTrigger: Boolean,
    toggle: Boolean,
    activeText: String,
  },

  computed: {
    toggleActive: function () {
      let showText = false;
      if (this.toggle) {
        if (this.active && this.activeText) showText = true
      }
      return showText;
    }
  },

  data() {
    return {
      active: Boolean
    }
  },

  mounted() {
    if (this.toggle) this.$el.addEventListener('click', this.toggleState);
  },

  methods: {
    toggleState() {
      this.active = !this.active;
    }
  }
}
