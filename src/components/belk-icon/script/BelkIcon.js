export default {
  name: 'BelkIcon',
  props: {
    height: {
      type: Number,
      default: null
    },

    width: {
      type: Number,
      default: 60
    },

    name: {
      type: String,
      default: 'cancel'
    },
  },

  data() {
    return {
      title: false,
      viewbox: '0 0 24 24',
      configured: false
    }
  },

  computed: {
    iconID() {
      return `#${this.name}`;
    }
  },

  mounted() {
    if (this.width) this.$el.style.width = `${this.width}px`;
    if (this.$refs.title) this.title = this.$refs.title.innerText;
    this.$bus.$emit(`icon-setup`, this);
  },

  methods: {
    setup(data){ 
      if (!this.configured) {
        this.configured = true;
        console.log("TEST: ",data)
        this.$bus.$off(`icon-${this.name}`, this.setup);
        this.viewbox = data;
      }
    }
  }
}