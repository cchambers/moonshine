export default {
  name: 'Button',

  props: {
    closeTrigger: Boolean
  },
  
  mounted() {
    this.events();
  },

  methods: {
    events() {
      this.$el.addEventListener('click', this.ripple)
    },
    ripple(e) {
      let ripple = document.createElement('div');
      ripple.classList.add('ripple');
      var rect = e.target.getBoundingClientRect();
      var x = e.clientX - rect.left; //x position within the element.
      var y = e.clientY - rect.top; 
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      this.$el.append(ripple);
      setTimeout(()=>{
        ripple.remove();
      }, 800);
    }
  }
}
