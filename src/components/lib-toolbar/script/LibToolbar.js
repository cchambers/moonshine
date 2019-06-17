export default {
  name: 'LibToolbar',
  props: {
    baseCode: String
  },
  data() {
    return {
      code: '',
      codeTarget: this.$refs.component,
      updateTimer: 0
    }
  },
  
  mounted() {
    if (this.baseCode) {
      // this.baseCode.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
      //   return '&#' + i.charCodeAt(0) + ';';
      // });
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