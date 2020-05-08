import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Combo',

  data() {
    return {
      isActive: false,
      activeText: 'Select',
      options: [],
    };
  },

  watch: {
    isActive(val) {
      if (val) {
        this.$bus.$emit('combo-opening', {
          id: this.uuid,
        });
      }
    },
  },

  methods: {
    events() {
      document.addEventListener('click', (e) => {
        if (!this.elementContains(this.$el, e.target) && this.isActive) this.toggleActive();
      });

      this.$bus.$on('combo-opening', (data) => {
        if (data.uuid === this.uuid) return;
        if (this.active) this.toggleActive();
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
