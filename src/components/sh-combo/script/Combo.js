import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Combo',
  props: {
    msg: {
      type: String,
      default: 'new component',
    },
  },

  data() {
    return {
      snapping: false,
    };
  },

  methods: {
    //
  },

};
