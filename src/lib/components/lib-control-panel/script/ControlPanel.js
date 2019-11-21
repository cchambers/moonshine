import ComponentPrototype from '../../../../components/component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'ControlPanel',

  data() {
    return {
      theme: 'default',
      navShown: false,
    };
  },

  watch: {
    theme(val) {
      document.documentElement.setAttribute('theme', val);
    },

    navShown(val) {
      if (val) {
        document.documentElement.classList.add('nav-shown');
      } else {
        document.documentElement.classList.remove('nav-shown');
      }
    },
  },

  methods: {
    events() {
      const self = this;
      self.$bus.$on('close-nav', self.closeNav);
      self.$bus.$on('toggle-nav', self.toggleNav);

      window.addEventListener('keyup', (e) => {
        const key = e.keyCode;
        if (key === 192) {
          self.$bus.$emit('close-modals');
          self.toggleNav();
        }
      });
    },
    back() {
      window.history.back();
    },
    openNav() {
      this.$bus.$emit('nav-shown');
    },
    toggleNav() {
      this.navShown = !this.navShown;
      this.$bus.$emit('nav-toggled');
    },
    closeNav() {
      this.$bus.$emit('nav-closed');
    },
    closeModal() {
      this.$bus.$emit('close-modals');
    },
    toggleTheme() {
      this.theme = (this.theme === 'default') ? 'dark' : 'default';
      window.localStorage.setItem('docs-theme', this.theme);
    },
  },

  mounted() {
    const theme = window.localStorage.getItem('docs-theme');
    if (theme) this.theme = theme;
  },
};
