import { EventBus } from '../../event-bus.js';

export default {
  name: 'ControlPanel',
  methods: {
    openNav() {
      document.documentElement.classList.add('nav-shown');
    },
    toggleNav() {
      document.documentElement.classList.toggle('nav-shown');
    },
    closeNav() {
      document.documentElement.classList.remove('nav-shown');
      EventBus.$emit('nav-closed');
    },
    closeModal() {
      document.documentElement.classList.remove('modal-shown');
    },
  }
}