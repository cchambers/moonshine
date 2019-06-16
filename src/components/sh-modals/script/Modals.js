export default {
  name: 'Modals',

  data() {
    return {
      count: 0,
      modals: []
    }
  },

  mounted() {
    this.modals = this.$el.querySelectorAll('.modal');
  },

  methods: {
    show(which) {
      var i;
      for (var x = 0, l = this.modals.length; x < l; x++) {
        var el = this.modals[x];
        el.classList.remove('active');
        if (el.id == which) {
          i = x;
          break;
        }
      }
      var target = this.modals[i];
      if (target) {
        this.$el.classList.add('modal-shown');
        target.classList.add('active');
      }
    },
  }
}