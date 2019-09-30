import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'AdaptContent',
  props: {
    sm: String,
    md: String,
    lg: String,
    xl: String,
    elementLevel: Boolean,
    uniqueId: String,
  },

  data() {
    return {
      id: String,
      defaultContent: '',
      smContent: '',
      mdContent: '',
      lgContent: '',
      xlContent: '',
      resizeTimer: 0,
    };
  },

  methods: {
    resizeHandler() {
      const self = this;
      clearTimeout(self.resizeTimer);
      this.resizeTimer = setTimeout(self.checkState, 50);
    },

    checkState() {
      let width = 0;
      if (this.elementLevel) {
        width = this.$el.parentNode.outerWidth;
      }
      return width;
    },
  },

  mounted() {
    if (this.uniqueId) {
      this.id = this.uniqueId;
    } else {
      this.setUUID();
      this.id = `ac-${this.uuid}`;
    }

    if (this.$slots.default) this.defaultContent = this.$slots.default[0].elm.innerHTML;
    if (this.$slots.sm) this.sm = this.$slots.sm[0].elm.innerHTML;
    if (this.$slots.md) this.mdContent = this.$slots.md[0].elm.innerHTML;
    if (this.$slots.lg) this.lgContent = this.$slots.lg[0].elm.innerHTML;
    if (this.$slots.xl) this.xlContent = this.$slots.xl[0].elm.innerHTML;

    if (!this.smContent) this.smContent = this.sm || this.defaultContent;
    if (!this.mdContent) this.mdContent = this.md || this.smContent;
    if (!this.lgContent) this.lgContent = this.lg || this.mdContent;
    if (!this.xlContent) this.xlContent = this.xl || this.lgContent;
  },
};
