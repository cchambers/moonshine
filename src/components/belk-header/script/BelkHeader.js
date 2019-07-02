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
      snapping: false
    }
  },
  
  methods: {
    recover() {
      this.halve();
      this.snapping = false;
      this.$emit('snapped');
    },

    halve() {
      let str = this.$el.innerText;
      if (!str.length) return;
      let middle = Math.ceil(str.length / 2);
      let half = str.slice(0, middle);
      this.$el.innerText = half.trim();
    }
  },

}