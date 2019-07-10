export default {
  name: 'Rating',
  
  props: {
    level: String,
    icon: String,
    count: Number
  },

  data() {
    return {
      maticon: 'star_rate',
      ratecount: 0
    }
  },

  mounted() {
    if (this.icon) this.maticon = this.icon;
    if (this.count) this.ratecount = this.count;
  }
}