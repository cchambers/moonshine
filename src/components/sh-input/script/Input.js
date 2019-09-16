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
      let val = e.target.value;
      this.log(val);
    }
  }
}