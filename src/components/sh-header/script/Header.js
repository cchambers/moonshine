import { EventBus } from "../../event-bus";

export default {
  name: 'Header',
  props: {
    nav: Boolean
  },
  data() {
    return {
      pageName: 'test',
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
      if (scroll_pos > 75) {
        if (!self.pageNameActive) self.pageNameActive = true;
      } else {
        if (self.pageNameActive) self.pageNameActive = false;
      }
    }
  
    main.addEventListener('scroll', function(e) {
      lastKnown = main.scrollTop;
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateHeader(lastKnown);
          ticking = false;
        });
        ticking = true;
      }
    });

    EventBus.$on('header-page-name', function(data) {
      self.pageName = data;
    })
  }
}
