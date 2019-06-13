export default {
  name: 'Header',
  props: {
    nav: false
  },
  methods: {
    toggleNav() {
      document.documentElement.classList.toggle('nav-shown');
    },
  }
}
