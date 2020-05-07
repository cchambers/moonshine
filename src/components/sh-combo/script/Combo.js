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
      isActive: false,
      activeText: 'Select',
    };
  },

  watch: {
    isActive(val, old) {
      if (val) console.log('opening', old);
    },
  },

  methods: {
    events() {
      document.addEventListener('click', (e) => {
        if (!this.elementContains(this.$el, e.target) && this.isActive) this.toggleActive();
      });

      this.$bus.$on('combo-opening', (e) => {
        console.log(e);
      });
    },

    buttonHandler(e) {
      e.preventDefault();
      this.toggleActive();
    },

    toggleActive() {
      this.isActive = !this.isActive;
    },

    optionHandler(e) {
      console.log(e.target);
    },
  },

};
