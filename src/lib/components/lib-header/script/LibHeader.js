export default {
  name: 'LibHeader',

  props: {
    nav: Boolean
  },

  data() {
    return {
      pageName: '',
      pageNameActive: false
    }
  },

  methods: {
    toggleNav() {
      document.documentElement.classList.toggle('nav-shown');
    },
  },

  mounted() {
    let self = this;
    let lastKnown = 0;
    let ticking = false;
    let main = document.querySelector('main');

    function updateHeader(scroll_pos) {
      if (scroll_pos > 100) {
        if (!self.pageNameActive) self.pageNameActive = true;
      } else {
        if (self.pageNameActive) self.pageNameActive = false;
      }
    }
  
    main.addEventListener('scroll', function() {
      lastKnown = main.scrollTop;
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateHeader(lastKnown);
          ticking = false;
        });
        ticking = true;
      }
    });

    let h1 = document.querySelector('h1');
    if (h1) self.pageName = h1.innerText;
  }
}
