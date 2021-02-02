const UtagBehavior = {
  props: {
    aali: {
      type: String,
      value: false,
    },
  },

  methods: {
    tagEvent(tag) {
      if (window.utag && tag) {
        window.utag.link({
          event_name: 'internal_campaign_click',
          link_name: tag,
        });
      } else {
        this.log(`Tag error: ${tag}`);
      }
      return this;
    },
  },
};

export default UtagBehavior;
