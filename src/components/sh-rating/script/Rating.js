export default {
  name: 'Rating',
  
  props: {
    count: Number,
    icon: String,
    level: Number,
    choose: Boolean
  },

  data() {
    return {
      maticon: 'star_rate',
      show: 0,
      ratecount: 0,
      chosen: false
    }
  },

  mounted() {
    if (this.icon) this.maticon = this.icon;
    if (this.count) this.ratecount = this.count;
  },

  methods: {
    hoverHandler(e) {
      this.show = e.target.value;
    },

    rateHandler(e) {
      if (!this.chosen && this.count) this.ratecount++;
      this.chosen = e.target.value;
      this.$bus.$emit('rating-chosen', this.chosen);
    }
  }
}