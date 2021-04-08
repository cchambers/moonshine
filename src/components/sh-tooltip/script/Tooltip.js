import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Tooltip',
  props: {
    tip: String,
    id: String,
  },

  data() {
    return {
      tipId: String,
      ariaHidden: true,
      tipData: '',
      active: false,
      html: false,
    };
  },

  created() {
    this.setUUID();
    this.tipId = `tip-${this.uuid}`;
  },

  mounted() {
    if (this.$slots.default) this.html = this.$slots.default[0].elm.innerHTML;
  },

  methods: {
    events() {
      this.$bus.$on(`${this.id}-show`, () => {
        this.active = true;
      });
      this.$bus.$on(`${this.id}-hide`, () => {
        this.active = false;
      });
      this.$bus.$on(`${this.id}-update`, (data) => {
        this.tipData = data.tip;
      });
    },
  },
};
