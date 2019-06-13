export default {
  name: 'Header',
  methods: {
    toggleNav() {
      document.documentElement.classList.toggle('nav-shown');
    },
  }
}
