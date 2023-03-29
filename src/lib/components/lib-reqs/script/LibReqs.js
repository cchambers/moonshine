export default {
  name: 'LibReqs',
  data() {
    return {
      items: [],
      component: String,
    };
  },

  mounted() {
    setTimeout(() => {
      const str = window.location.pathname.split('/');
      // eslint-disable-next-line prefer-destructuring
      this.component = str[2];
      const schema = window.schema.components[this.component]
      || window.schema.features[this.component] || window.schema.template[this.component];
      this.items = schema.requirements;
    });
  },
};
