import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Carousel',

  props: {
    startAt: {
      // 'Which position in the slide array should the modal begin on',
      type: Number,
      default: 0,
    },
    perNext: {
      // 'How many items the carousel will cycle through on interaction',
      type: Number,
      default: 1,
    },
    hideArrows: {
      // 'Hide the next/previous arrow controls',
      type: Boolean,
      default: false,
    },
    hideDots: {
      // 'Hide the dot controls',
      type: Boolean,
      default: false,
    },
    autoplay: {
      // 'Begin automatically cycling',
      type: String,
      default: null,
    },
    resolution: {
      // 'Begin automatically cycling',
      type: String,
      default: null,
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
      playTimer: {},
    };
  },

  computed: {
    mode() {
      return (this.paused) ? 'paused' : 'playing';
    },

    delayTimer() {
      // eslint-disable-next-line radix
      let delay = (parseInt(this.autoplay) || 5000);
      if (delay < 2000) delay = 2000;
      return delay;
    },

    isFocused() {
      let focused = false;
      if (this.$el) focused = this.$el.contains(document.activeElement);
      return focused;
    },
  },

  mounted() {
    const slides = this.$slots.slides[0];
    this.slides = slides.elm.children;
    this.active = this.startAt;
    if (!this.resolution) setTimeout(this.autoSize);
    if (this.autoplay) this.play();
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
      if (bool) {
        clearTimeout(this.playTimer);
      } else if (this.autoplay && !this.buttonPaused) this.play();
    },

    pause() {
      clearTimeout(this.playTimer);
      this.paused = true;
    },

    play(delay = 5000) {
      this.playTimer = setTimeout(() => {
        if (!this.paused && !this.focused) this.next();
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

    autoSize() {
      this.$refs.slides.classList.add('config');
      let maxHeight = 0;
      const slides = this.$el.querySelectorAll('.slides li');
      slides.forEach((slide) => {
        const ht = slide.offsetHeight;
        if (ht > maxHeight) maxHeight = ht;
      });
      this.$refs.slides.classList.remove('config');
      const heightStr = `${maxHeight}px`;
      this.$refs.spacer.style.height = heightStr;
    },
  },

};
