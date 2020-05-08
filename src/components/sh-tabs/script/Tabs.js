import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Tabs',
  props: {
    uniqueId: {
      type: String,
      required: true,
    },
    for: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      uuid: undefined,
      buttons: [],
    };
  },

  mounted() {
    const self = this;
    self.buttons = self.$refs.tabs.children;
    self.buttons.forEach((el) => {
      const x = el;
      x.clickEvent = `click-${self.for}`;
    });
  },

  methods: {
    //
  },

};
