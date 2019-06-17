  export default {
  name: 'Button',
  props: {
    pre: {
      type: String,
      default: 'walked'
    },
    post: {
      type: String,
      default: 'miles'
    }
  },
  data() {
    return {
      count: 1000
    }
  }
}