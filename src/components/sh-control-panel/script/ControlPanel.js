export default {
  name: 'ControlPanel',
  
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
    },
    toggleNav() {
      document.documentElement.classList.toggle('nav-shown');
      this.$bus.$emit('nav-toggled');
    },
    closeNav() {
      document.documentElement.classList.remove('nav-shown');
      this.$bus.$emit('nav-closed');
    },
    closeModal() {
      document.documentElement.classList.remove('modal-shown');
      this.$bus.$emit('close-modals');
    },
  },

  mounted() {
    this.events();
  },
}