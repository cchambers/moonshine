import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Banner',

  props: {
    backgrounds: {
      type: String,
      default: 'lowlight-secondary, lowlight-tertiary',
    },
    textFrom: {
      type: String,
      default: 'bottom',
    },
    textTo: {
      type: String,
      default: 'bottom',
    },
    textIn: {
      type: String,
      default: '400',
    },
    textOut: {
      type: String,
      default: '250',
    },
    changeDelay: {
      type: String,
      default: '400',
    },
  },

  data() {
    return {
      animate: 'in',
      carousel: undefined,
      carouselId: undefined,
      carouselSpeed: 5000,
      background: 'back-lowlight-primary',
      backgroundArray: [],
      whichback: 0,
    };
  },

  mounted() {
    this.findCarousel();
    this.configureBackgrounds();
  },

  methods: {
    // events() {
    //   const self = this;
    // },

    findCarousel() {
      const self = this;
      const el = self.$el.querySelector('sh-carousel');
      if (el) {
        setTimeout(() => {
          const target = el.querySelector('.sh-carousel');
          self.carouselId = target.id;
          self.carousel = el.getVueInstance();
          self.$bus.$on('carousel-slide-changing', (data) => {
            if (data.id === self.carouselId) {
              self.animate = 'out';
            }
          });
          self.$bus.$on('carousel-slide-changed', (data) => {
            if (data.id === self.carouselId) {
              self.handleCarousel();
            }
          });

          if (self.carousel.autoplay) this.carouselSpeed = self.carousel.autoplay;
          self.carousel.setChangeDelay(parseInt(this.changeDelay, 10));
        }, 20);
      }
    },

    configureBackgrounds() {
      const arr = this.backgrounds.split(',');
      for (let x = 0, l = arr.length; x < l; x += 1) {
        arr[x] = `back-${arr[x].trim()}`;
      }
      this.backgroundArray = arr;
      this.handleBackground(0);
    },

    handleCarousel() {
      if (this.backgroundArray.length) this.handleBackground();
      this.animate = 'in';
    },

    handleBackground(defwhich = null) {
      let which;
      if (defwhich !== null) {
        which = defwhich;
      } else {
        which = this.whichback;
        which += 1;
        if (which >= this.backgroundArray.length) which = 0;
      }
      this.whichback = which;
      this.background = this.backgroundArray[which];
    },
  },
};
