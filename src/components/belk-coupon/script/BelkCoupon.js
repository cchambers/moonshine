import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkCoupon',

  methods: {
    events() {
      this.log('ev');
    },
  },

};
