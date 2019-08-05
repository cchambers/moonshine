export default {
  name: 'ControlPanel',

  data() {
    return {
      theme: 'default'
    }
  },

  watch: {
    theme: function (val) {
      document.documentElement.setAttribute('theme', val);
    }
  },

  methods: {
    events() {
      let self = this;
      self.$bus.$on('close-nav', self.closeNav);
      self.$bus.$on('toggle-nav', self.toggleNav);

      window.addEventListener('keyup', (e) => {
        let key = e.keyCode;
        if (key == 192) {
          self.$bus.$emit('close-modals');
          self.$bus.$emit('toggle-nav');
        }
      });
    },
    back() {
      window.history.back();
    },
    openNav() {
      document.documentElement.classList.add('nav-shown');
      this.$bus.$emit('nav-shown');
      this.$bus.$emit('show-curtain');
    },
    toggleNav() {
      document.documentElement.classList.toggle('nav-shown');
      this.$bus.$emit('nav-toggled');
      let isActive = document.documentElement.classList.contains('nav-shown');
      if (isActive) {
        this.$bus.$emit('show-curtain');
      } else {
        this.$bus.$emit('hide-curtain');
      }
    },
    closeNav() {
      document.documentElement.classList.remove('nav-shown');
      this.$bus.$emit('nav-closed');
      this.$bus.$emit('hide-curtain');
    },
    closeModal() {
      document.documentElement.classList.remove('modal-shown');
      this.$bus.$emit('close-modals');
    },
    toggleTheme() {
      this.theme = (this.theme == 'default') ? 'dark' : 'default';
      window.localStorage.setItem('docs-theme', this.theme);
    }
  },

  mounted() {
    let theme = window.localStorage.getItem('docs-theme');
    if (theme) this.theme = theme;
  },
}