export default {
  name: 'LibToolbar',
  props: {
    baseCode: String
  },
  data() {
    return {
      code: 'none',
      codeTarget: this.$refs.component,
      updateTimer: 0
    }
  },
  
  mounted() {
    if (this.baseCode) {
      this.code = this.baseCode;
    }
  },

  updated() {
    if (this.updateTimer) {
      clearTimeout(this.updateTimer)
    }
    this.updateTimer = setTimeout(this.renderComponent, 200);
  },

  methods: {
    renderComponent() {
      this.$refs.component.innerHTML = this.code;
    }
  }
}