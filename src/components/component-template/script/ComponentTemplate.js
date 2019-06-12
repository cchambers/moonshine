export default {
  name: 'ComponentTemplate',
  props: {
    msg: {
      type: String,
      default: 'new component'
    }
  },
  data() {
    return {
      count: 0,
      snapping: false
    }
  },
  methods: {
    snap() {
      if (!this.snapping) {
        this.$el.classList.add('snap-state');
        this.snapping = true;
        this.snapTimeout = setTimeout(this.recover, 1500);
        
        let str = this.$el.innerText;
        if (!str.length) return;
        let middle = Math.ceil(str.length / 2);
        let half = str.slice(0, middle);
        this.$el.innerText = half.trim();

        this.$emit('snapping');
      }
    },
    recover() {
      this.$el.classList.remove('snap-state');
      this.snapping = false;
      this.$emit('snapped');
    }
  },

}