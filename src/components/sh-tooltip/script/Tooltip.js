//import ComponentPrototype from '../../../components/component-prototype';

export default {
  //mixins: [ComponentPrototype],

  name: 'Tooltip',
  props: {
    tip: String
  },

  data() {
    return {
      tipId: String,
      ariaHidden: true
    }
  },

  created() {
    this.setUUID();
    this.tipId = `tip-${this.uuid}`;
  },

  mounted() {
    this.html = this.$slots.default[0].elm.innerHTML;
  }
}