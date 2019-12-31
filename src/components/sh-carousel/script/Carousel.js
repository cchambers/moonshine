import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Carousel',

  props: {
    startAt: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      slides: [],
      active: 0,
    };
  },

  mounted() {
    const slides = this.$slots.slides[0];
    this.slides = slides.elm.children;
    this.activate(this.startAt);
  },

  methods: {
    next() {
      console.log('next');
    },

    previous() {
      console.log('previous');
    },

    activate(which = 0) {
      this.slides.forEach((slide, index) => {
        if (index === which) {
          slide.classList.add('active');
        } else if (slide.classList.contains('active')) slide.classList.remove('active');
      });
    },
  },

};
