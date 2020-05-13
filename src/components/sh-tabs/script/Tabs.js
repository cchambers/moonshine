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
      const val = el.getAttribute('default-value');
      const x = el;
      x.clickEvent = `click-${self.target}`;
      x.ariaRole = 'tab';
      x.ariaControls = `#tab-${val}`;
      comboOpts.push({
        text: el.innerText,
        value: val,
      });
    });
    self.comboOptions = comboOpts;
  },

  methods: {
    events() {
      this.$bus.$on('view-swapper-changed', this.swapperChangedHandler);
      this.$bus.$on('value-changed', this.comboValueHandler);
    },

    swapperChangedHandler(data) {
      const self = this;
      if (data.group === self.target) {
        self.activate(data.which); // TODO: remove this, make work w/ button toggle group func
        this.$bus.$emit('combo-sync', {
          group: this.target,
          value: data.which,
        });
      }
    },

    comboValueHandler(data) {
      if (data.group === this.target) {
        this.activate(data.value);
      }
    },

    activate(which) {
      const self = this;
      self.buttons.forEach((el) => {
        if (which === el.defaultValue) {
          el.classList.add('active');
          el.setAttribute('aria-selected', true);
        } else if (el.classList.contains('active')) {
          el.classList.remove('active');
          el.setAttribute('aria-selected', false);
        }
      });
    },
  },

};
