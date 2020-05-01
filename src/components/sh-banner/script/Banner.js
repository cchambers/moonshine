import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Banner',

  props: {
    backgrounds: {
      type: String,
      default: 'lowlight-secondary, lowlight-tertiary',
    },
  },

  data() {
    return {
      animate: 'out',
      carousel: undefined,
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
          console.log('GOT ONE!');
          self.carousel = el.querySelector('.sh-carousel').id;
          self.$bus.$on('carousel-slide-changing', (data) => {
            if (data.id === self.carousel) {
              self.animate = 'out';
            }
          });
          self.$bus.$on('carousel-slide-changed', (data) => {
            console.log(data.id, self.carousel);
            if (data.id === self.carousel) {
              self.handleCarousel();
            }
          });
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
