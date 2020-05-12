import ComponentPrototype from '../../component-prototype';
import Combo from '../../sh-combo/vue/Combo.vue';

export default {
  mixins: [ComponentPrototype],

  name: 'Tabs',
  props: {
    uniqueId: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      uuid: undefined,
      buttons: [],
      combo: Combo,
      comboOptions: [],
    };
  },

  mounted() {
    const self = this;
    self.setUUID();
    self.buttons = self.$refs.tabs.children;
    // const newEls = [];
    const comboOpts = [];
    self.buttons.forEach((el) => {
      const x = el;
      x.clickEvent = `click-${self.target}`;
      x.ariaRole = 'tab';
      // newEls.push(`<li>${el.innerText}</li>`);
      comboOpts.push({
        text: el.innerText,
        value: el.getAttribute('default-value'),
      });
    });
    self.comboOptions = comboOpts;
  },

  methods: {
    events() {
      this.$bus.$on('view-swapper-changed', this.swapperChangedHandler);
    },

    swapperChangedHandler(data) {
      const self = this;
      if (data.group === self.target) self.activate(data.which);
    },

    activate(which) {
      const self = this;
      self.buttons.forEach((el) => {
        if (which === el.defaultValue) {
          el.classList.add('active');
        } else if (el.classList.contains('active')) el.classList.remove('active');
      });
    },
  },

};
