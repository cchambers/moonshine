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
      background: 'back-lowlight-primary',
      backgroundArray: [],
      whichback: 0,
    };
  },

  methods: {
    events() {
      this.$on('carousel-slide-changed', this.handleCarousel);
    },

    handleCarousel(data) {
      this.log('carousel event');
      this.log(data);
    },

    handleBackground() {
      let which = this.whichback;
      which += 1;
      if (which === this.whichback.length) which = 0;

      this.whichback = which;
    },
  },
};
