export default {
  name: 'BelkLogo',
  props: {
    smart: Boolean,
    width: Number,
    color: {
      type: String,
      default: 'lowlight-primary'
    }
  },

  mounted() {
    if (this.width) this.$refs.logo.style.maxWidth = `${this.width}px`;
  }
}