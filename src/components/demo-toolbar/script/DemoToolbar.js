export default {
  name: 'DemoToolbar',
  props: {},
  data() {
    return {
      count: 0,
      code: String
    }
  },
  
  mounted() {
    // eslint-disable-next-line
    console.log(this.$el.innerHTML)
  }
}