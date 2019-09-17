import InputPrototype from './../../input-prototype'

//import ComponentPrototype from '../../../components/component-prototype';

export default {
  //mixins: [ComponentPrototype],

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