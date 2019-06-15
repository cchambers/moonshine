export default {
  name: 'Header',
  props: {
    nav: Boolean
  },
  methods: {
    toggleNav() {
      document.documentElement.classList.toggle('nav-shown');
    },
  }
}
