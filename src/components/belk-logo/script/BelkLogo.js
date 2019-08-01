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
    let _w = `${this.width}px`;
    if (this.width) this.$refs.logo.style.maxWidth = _w;
  }
}