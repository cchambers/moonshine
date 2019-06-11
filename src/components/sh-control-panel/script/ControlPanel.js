export default {
  name: 'ControlPanel',
  data: function () {
    return {
      count: 0
    }
  },
  methods: {
    navToggle() {
      document.documentElement.classList.toggle('nav-shown');
    },
    closeModal() {
      document.documentElement.classList.remove('nav-shown');
    },
  }
}