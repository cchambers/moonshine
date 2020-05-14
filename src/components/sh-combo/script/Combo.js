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
    native: {
      type: Boolean,
    },
    id: {
      type: String,
    },
  },

  data() {
    return {
      isActive: false,
      activeText: 'Select',
      activeIndex: 0,
      highlightedIndex: 0,
      options: [],
      button: {},
      ignoreKeys: [37, 39, 91, 16, 13],
      navKeys: [38, 40],
      value: undefined,
      selectId: undefined,
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

  created() {
    this.setUUID();
  },

  mounted() {
    const self = this;
    const opts = self.$refs.options.children;
    if (opts.length > 0) self.processHTMLOptions();
    if (this.native) {
      this.selectId = `sel-${this.uuid}`;
    }
  },

  methods: {
    events() {
      document.addEventListener('click', (e) => {
        if (!this.elementContains(this.$el, e.target) && this.isActive) this.toggleActive('off-click');
      });

      this.$bus.$on('combo-opening', (data) => {
        if (data.id === this.uuid) return;
        if (this.isActive) this.toggleActive('combo-opening handler');
      });

      if (this.target) this.$bus.$on('view-swapper-changed', this.swapperChangedHandler);
      if (this.comboOptions.length) this.options = this.comboOptions;
      this.$bus.$on('combo-sync', this.handleSync);
    },

    buttonHandler(e) {
      e.preventDefault();
      this.toggleActive('button handler');
    },

    enterHandler(e) {
      e.preventDefault();
      if (this.isActive) {
        this.select(this.highlightedIndex);
      } else {
        this.toggleActive('enter handler');
      }
    },

    selectHandler(e) {
      this.selectFromVal(e.target.value);
    },

    swapperChangedHandler(data) {
      const self = this;
      if (data.group === self.target) {
        // console.log('swap', data);
      }
    },

    selectFromVal(str) {
      this.options.forEach((opt, index) => {
        if (opt.value === str) this.select(index);
      });
    },

    toggleActive(origin) {
      this.log(origin);
      this.isActive = !this.isActive;
      if (this.native) {
        this.log('NATIVE', 2);
        const event = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        this.$refs.select.dispatchEvent(event);
      }
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
          if (opt.value === data.value) this.select(index, false);
        });
      }
    },

    select(el, event = true, toggle = true) {
      let which = el;
      if (typeof which === 'number') which = this.$refs.options.querySelectorAll('li')[which];

      const obj = {
        id: this.$el.id,
        group: this.target || false,
        text: which.innerText,
        value: which.getAttribute('value'),
      };

      this.options.forEach((opt, index) => {
        if (opt.value !== obj.value) {
          this.$set(this.options[index], 'active', false);
        } else {
          this.$set(this.options[index], 'active', true);
          this.activeIndex = index;
        }
      });
      if (event) this.$bus.$emit('value-changed', obj);
      this.activeText = obj.text;
      if (this.isActive && toggle) this.toggleActive('select');
    },

    processHTMLOptions() {
      this.options.forEach((el) => {
        console.log(el);
      });
    },

    highlightHandler(e) {
      e.preventDefault();
      let dir = 0;
      const key = e.charCode || e.keyCode;
      let which = this.activeIndex;

      switch (key) {
        case 38:
          dir = -1;
          break;
        case 40:
          dir = 1;
          break;
        default:
          dir = 0;
          break;
      }

      const { length } = this.options;
      which += dir;
      if (which >= length) which = 0;
      if (which < 0) which = length - 1;

      this.select(which, true, false);
    },
  },
};
