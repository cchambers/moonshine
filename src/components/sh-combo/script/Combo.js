import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Combo',

  props: {
    comboOptions: {
      type: Array,
    },
    tabTarget: {
      type: String,
    },
  },

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

  mounted() {
    const self = this;
    const opts = self.$refs.options.children;
    if (opts.length > 0) self.processHTMLOptions();
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

      if (this.tabTarget) {
        this.$bus.$on('view-swapper-changed', this.swapperChangedHandler);
      }

      if (this.comboOptions.length) {
        this.options = this.comboOptions;
      }
    },

    buttonHandler(e) {
      e.preventDefault();
      this.toggleActive();
    },

    swapperChangedHandler(data) {
      const self = this;
      if (data.group === self.tabTarget) {
        console.log('swap', data);
      }
    },

    toggleActive() {
      this.isActive = !this.isActive;
    },

    optionClickHandler(e) {
      let el = e.target;
      if (el.nodeName !== 'LI') {
        el = el.closest('li');
      }
      this.select(el);
    },

    select(el) {
      const obj = {
        text: el.innerText,
        value: el.getAttribute('value'),
      };

      this.options.forEach((opt, index) => {
        if (opt.value !== obj.value) {
          this.$set(this.options[index], 'active', false);
        } else {
          this.$set(this.options[index], 'active', true);
        }
      });
      this.$bus.$emit('value-changed', obj);
      this.activeText = obj.text;
      this.toggleActive();
    },

    processHTMLOptions() {
      this.options.forEach((el) => {
        console.log(el);
      });
    },
  },
};
