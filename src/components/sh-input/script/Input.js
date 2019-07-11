import InputPrototype from './../../input-prototype'

export default {
  name: 'Input',
  mixins: [InputPrototype],
  props: {
    label: String,
    defaultValue: String,
  },

  data() {
    return {
      test: 'ok',
    }
  },

  methods: {
    keyupHandler(e){
      // eslint-disable-next-line
      console.log(e.target)
      // console.log(e.target.value);
    }
  }
}