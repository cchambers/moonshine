export default {
  name: 'BelkIcon',
  props: {
    height: {
      type: Number,
      default: null
    },

    width: {
      type: Number,
      default: 45
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
    this.doReady();
    this.$bus.$on(`icons-ready`, this.checkConfig);
  },

  methods: {
    doReady() {
      this.$bus.$emit(`icon-setup`, this);
    },

    checkConfig() {
      if (!this.configured) this.doReady();
    },

    setup(data){ 
      if (!this.configured) {
        this.configured = true;
        this.viewbox = data;
      }
    }
  }
}