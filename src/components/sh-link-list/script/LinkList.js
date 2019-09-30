import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'ShLinkList',
  props: {
    eventOnly: Boolean,
  },

  data() {
    return {
      snapping: false,
      items: [
        {
          text: 'test 1',
          link: '#link1',
        },
        {
          text: 'test 2',
          link: '#link2',
        },
        {
          text: 'test 3',
          link: '#link3',
        },
      ],
    };
  },

  methods: {
    clickHandler(e) {
      if (this.eventOnly) e.preventDefault();
      const { key } = e.target.dataset;
      if (key) {
        for (let x = 0, l = this.items.length; x < l; x++) {
          const item = this.items[x];
          if (item.active) this.deactivate(x);
        }
      }
      this.activate(key);
    },

    activate(key) {
      const item = this.items[key];
      this.$set(item, 'active', true);
      this.$bus.$emit('selected', item);
    },

    deactivate(key) {
      this.$set(this.items[key], 'active', false);
    },
  },

};
