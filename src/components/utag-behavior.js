const UtagBehavior = {
  props: {
    aali: {
      type: String,
      value: false,
    },
  },

  methods: {
    tagEvent() {
      if (window.utag && this.aali) {
        window.utag.link({
          event_name: 'internal_campaign_click',
          link_name: this.aali,
        });
      }
      return this;
    },
  },
};

export default UtagBehavior;
