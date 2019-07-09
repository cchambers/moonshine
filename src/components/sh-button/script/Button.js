export default {
  name: 'Button',

  props: {
    closeTrigger: Boolean,
    toggle: Boolean,
    round: String,
    outline: Boolean
  },

  data() {
    return {
      active: false,
    }
  },

  methods: {
    tapHandler(e) {
      this.ripple(e);
      if (this.toggle) this.doToggle();
    },
    
    ripple(e) {
      let ripple = document.createElement('div');
      ripple.classList.add('ripple');
      var rect = e.target.getBoundingClientRect();
      var x = e.center.x - rect.left - 5; //x position within the element.
      var y = e.center.y - rect.top - 5; 
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      this.$el.prepend(ripple);
      setTimeout(()=>{
        ripple.remove();
      }, 1400);
    },

    doToggle() {
      this.active = !this.active;
    }
  },

}
