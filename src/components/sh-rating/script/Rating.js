import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Rating',

  props: {
    count: Number,
    icon: String,
    level: Number,
    choose: Boolean,
    arr: Array,
  },

  data() {
    return {
      maticon: 'star_rate',
      show: 0,
      ratecount: 0,
      chosen: false,
    };
  },

  mounted() {
    if (this.icon) this.maticon = this.icon;
    if (this.count) this.ratecount = this.count;
    if (this.arr) {
      this.$el.setAttribute('level', this.arr[0].toFixed(1));
    }
  },

  methods: {
    hoverHandler(e) {
      this.show = e.target.value;
    },

    rateHandler(e) {
      if (!this.chosen && this.count) this.ratecount += 1;
      this.chosen = e.target.value;
      this.$bus.$emit('rating-chosen', this.chosen);
    },
  },
};
