export default {
  name: 'ControlPanel',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    openNav() {
      document.documentElement.classList.add('nav-shown');
    },
    toggleNav() {
      document.documentElement.classList.toggle('nav-shown');
    },
    closeNav() {
      document.documentElement.classList.remove('nav-shown');
    },
    closeModal() {
      document.documentElement.classList.remove('modal-shown');
    },
  }
}