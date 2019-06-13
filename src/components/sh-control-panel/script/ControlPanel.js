import { EventBus } from '../../event-bus.js';

export default {
  name: 'ControlPanel',
  methods: {
    events() {
      EventBus.$on('close-nav', this.closeNav);
    },
    openNav() {
      document.documentElement.classList.add('nav-shown');
      EventBus.$emit('nav-shown');
    },
    toggleNav() {
      document.documentElement.classList.toggle('nav-shown');
      EventBus.$emit('nav-toggled');
    },
    closeNav() {
      document.documentElement.classList.remove('nav-shown');
      EventBus.$emit('nav-closed');
    },
    closeModal() {
      document.documentElement.classList.remove('modal-shown');
      EventBus.$emit('modal-shown');
    },
  },

  mounted() {
    this.events();
  },
}