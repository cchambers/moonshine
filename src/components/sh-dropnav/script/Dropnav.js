export default {
  name: 'Dropnav',
  props: {
    noActiveText: Boolean,
    listVariant: String
  },

  data() {
    return {
      activeItem: 'Choose Something!',
      list: Object,
      isOpen: false
    }
  },

  mounted() {
    this.list = this.$refs.list;
  },
  
  methods: {
    events() {
      this.$bus.$on('selected', (data) => {
        this.setActive(data.text);
        this.closeList();
      })
    },

    setActive(text) {
      this.activeItem = text;
    },

    toggleOpen() {
      if (this.isOpen) {
        this.closeList();
      } else {
        this.openList();
      }
    },

    openList() {
      this.isOpen = true;
    },

    closeList() {
      this.isOpen = false;
    }
  },

}