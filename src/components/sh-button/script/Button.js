import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Button',

  props: {
    closeTrigger: Boolean,
    toggle: Boolean,
    round: String,
    outline: Boolean,
    clickEvent: String,
  },

  data() {
    return {
      active: false,
    };
  },

  methods: {
    tapHandler(e) {
      this.ripple(e);
      if (this.toggle) this.doToggle();

      if (this.clickEvent) this.emit(this.clickEvent);
    },

    ripple(e) {
      const ripple = document.createElement('div');
      ripple.classList.add('ripple');
      const rect = e.target.getBoundingClientRect();
      const x = e.center.x - rect.left - 5; // x position within the element.
      const y = e.center.y - rect.top - 5;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      this.$el.prepend(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 1400);
    },

    doToggle() {
      this.active = !this.active;
    },
  },

};
