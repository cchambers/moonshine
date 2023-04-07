import ComponentPrototype from '../../../../utils/component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'LibHeader',

  props: {
    nav: Boolean,
  },

  data() {
    return {
      pageName: '',
      pageNameActive: false,
    };
  },

  methods: {
    toggleNav() {
      document.documentElement.classList.toggle('nav-shown');
    },
  },

  mounted() {
    const self = this;
    let lastKnown = 0;
    let ticking = false;
    const main = document.querySelector('main');

    function updateHeader(scrollPos) {
      self.pageNameActive = (scrollPos > 100);
    }

    main.addEventListener('scroll', () => {
      lastKnown = main.scrollTop;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateHeader(lastKnown);
          ticking = false;
        });
        ticking = true;
      }
    });

    const h1 = document.querySelector('h1');
    if (h1) self.pageName = h1.innerText;
  },
};
