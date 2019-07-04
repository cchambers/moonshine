export default {
  name: 'ShLinkList',
  props: {
    eventOnly: Boolean
  },

  data() {
    return {
      snapping: false,
      items: [
        {
          text: 'test 1',
          link: '#link1'
        },
        {
          text: 'test 2',
          link: '#link2',
        },
        {
          text: 'test 3',
          link: '#link3',
        }
      ]
    }
  },
  
  methods: {
    clickHandler(e) {
      if (this.eventOnly) e.preventDefault();
      let key = e.target.dataset.key;
      if (key) {
        for (let x = 0, l = this.items.length; x < l; x++) {
          let item = this.items[x];
          if (item.active) this.deactivate(x);
        }
      }
      this.activate(key);
    },

    activate(key) {
      let item = this.items[key];
      this.$set(item, 'active', true);
      this.$bus.$emit('selected', item);
    },

    deactivate(key) {
      this.$set(this.items[key], 'active', false);
    },
  },

}