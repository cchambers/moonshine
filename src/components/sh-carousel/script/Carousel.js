import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Carousel',

  props: {
    startAt: {
      type: Number,
      default: 0,
    },
    perNext: {
      type: Number,
      default: 1,
    },
    hideArrows: {
      type: Boolean,
      default: false,
    },
    hideDots: {
      type: Boolean,
      default: false,
    },
    autoplay: {
      type: String,
    },
  },

  data() {
    return {
      slides: [],
      dots: [],
      active: null,
      previousIcon: 'prev',
      nextIcon: 'next',
      paused: false,
    };
  },

  mounted() {
    const slides = this.$slots.slides[0];
    this.slides = slides.elm.children;
    this.active = this.startAt;
    if (this.autoplay) this.play(parseInt(this.autoplay, 10));
  },

  watch: {
    active(val) {
      this.slides.forEach((slide, index) => {
        if (index === val) {
          slide.classList.add('active');
        } else if (slide.classList.contains('active')) slide.classList.remove('active');
      });
    },
  },

  methods: {
    mousePause(bool = true) {
      this.paused = bool;
    },

    play(delay) {
      setTimeout(() => {
        if (!this.paused) this.next();
        this.play(delay);
      }, delay);
    },

    next() {
      let which = this.active + this.perNext;
      if (which >= this.slides.length) which = 0;
      this.active = which;
    },

    previous() {
      let which = this.active - this.perNext;
      if (which < 0) which = this.slides.length - 1;
      this.active = which;
    },

    activate(which) {
      this.active = which;
    },

    swipeHandler(e) {
      let dir = 'next';
      if (e.direction > 2) dir = 'previous';
      this[dir]();
    },
  },

};
