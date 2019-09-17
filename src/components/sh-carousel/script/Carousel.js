//import ComponentPrototype from '../../../components/component-prototype';

export default {
  //mixins: [ComponentPrototype],

  name: 'Carousel',
  props: {
    msg: {
      type: String,
      default: 'new component'
    }
  },

  data() {
    return {
      snapping: false
    }
  },
  
  methods: {

  },

}