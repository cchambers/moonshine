import ComponentPrototype from '../../../../utils/component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'ControlPanel',

  data() {
    return {
      theme: '"default"',
      navShown: false,
    };
  },

  watch: {
    theme(val) {
      document.documentElement.setAttribute('theme', val);
    },
  },

  methods: {
    events() {
      const self = this;
      self.$bus.$on('close-nav', self.closeNav);
    },
    back() {
      window.history.back();
    },
    closeModal() {
      this.$bus.$emit('close-modals');
    },
    toggleTheme() {
      this.theme = (this.theme === 'default') ? 'dark' : 'default';
      this.setItem('docs-theme', this.theme);
    },
  },

  mounted() {
    const theme = this.getItem('docs-theme') || 'default';
    if (theme) this.theme = theme;
  },
};
