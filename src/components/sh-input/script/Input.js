import InputPrototype from '../../input-prototype'
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype, InputPrototype],

  name: 'Input',

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