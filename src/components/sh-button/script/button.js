export default {
  name: 'Button',
  props: {
    pre: {
      type: String,
      default: "Bounced"
    },
    post: {
      type: String,
      default: "balls."
    }
  },
  data: function () {
    return {
      count: 0
    }
  }
}