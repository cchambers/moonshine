export default {
  name: 'Curtain',

  data() {
    return {
      active: false,
    }
  },

  methods: {
    events() {
      this.$bus.$on('show-curtain', this.show);
      this.$bus.$on('hide-curtain', this.hide);
    },

    show() {
      this.$bus.$emit('curtain-showing');
      this.active = true;
      this.$bus.$emit('curtain-shown');
    },

    hide() {
      this.$bus.$emit('curtain-hiding');
      this.active = false;
      this.$bus.$emit('curtain-hidden');
    },

    toggle() {
      if (this.active) {
        this.hide();
      } else {
        this.show();
      }
    },

    clickHanlder() {
      this.hide();
    }
  },

}