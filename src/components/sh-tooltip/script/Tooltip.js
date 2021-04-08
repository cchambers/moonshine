import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Tooltip',
  props: {
    tip: String,
  },

  data() {
    return {
      tipId: String,
      ariaHidden: true,
    };
  },

  created() {
    this.setUUID();
    this.tipId = `tip-${this.uuid}`;
  },

  mounted() {
    this.html = this.$slots.default[0].elm.innerHTML;
  },

  methods: {
    events() {
      this.$bus.$on(`${this.tipId}-show`, () => {
        this.active = true;
      });
      this.$bus.$on(`${this.tipId}-hide`, () => {
        this.active = false;
      });
      this.$bus.$on(`${this.tipId}-update`, (data) => {
        this.tip = data.tip;
      });
    },
  },
};
