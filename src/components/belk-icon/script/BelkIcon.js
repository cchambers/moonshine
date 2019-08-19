export default {
  name: 'BelkIcon',
  props: {
    height: {
      type: Number,
      default: 30
    },

    width: {
      type: Number,
      default: 30
    },

    name: {
      type: String,
      default: 'cancel'
    },
  },

  data() {
    return {
      title: false
    }
  },

  computed: {
    iconID() {
      return `#${this.name}`;
    }
  },

  mounted() {
    if (this.$refs.title) {
      this.title = this.$refs.title.innerText;
    }
  },
}