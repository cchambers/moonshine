const UtagBehavior = {
  methods: {
    tagEvent(obj) {
      if (window.utag && obj) {
        window.utag.link(obj);
      } else {
        this.log('Tag error.');
      }
      return this;
    },
  },
};

export default UtagBehavior;
