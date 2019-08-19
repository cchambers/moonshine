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

  computed: {
    iconID() {
      return `#${this.name}`;
    }
  }
}