import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Combo',

  props: {
    comboOptions: {
      type: Array,
    },
    target: {
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

      if (this.target) {
        this.$bus.$on('view-swapper-changed', this.swapperChangedHandler);
      }

      if (this.comboOptions.length) {
        this.options = this.comboOptions;
      }

      this.$bus.$on('combo-sync', this.handleSync);
    },

    buttonHandler(e) {
      e.preventDefault();
      this.toggleActive();
    },

    swapperChangedHandler(data) {
      const self = this;
      if (data.group === self.target) {
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

    handleSync(data) {
      if (data.group === this.target || this.group === data.group) {
        this.options.forEach((opt, index) => {
          if (opt.value === data.value) this.select(index);
        });
      }
    },

    select(el) {
      let which = el;
      if (typeof which === 'number') {
        which = this.$refs.options.querySelectorAll('li')[which];
      }

      const obj = {
        text: which.innerText,
        value: which.getAttribute('value'),
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
      if (this.isActive) this.toggleActive();
    },

    processHTMLOptions() {
      this.options.forEach((el) => {
        console.log(el);
      });
    },
  },
};
