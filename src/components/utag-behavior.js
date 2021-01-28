const UtagBehavior = {
  props: {
    aali: {
      type: String,
      value: false,
    },
  },

  created() {
    this.inputId = (this.uniqueId) ? this.uniqueId : `input-${this.uuid}`;
  },

  methods: {
    tagEvent() {
      if (window.utag && this.aali) {
        window.utag.link({
          event_name: 'internal_campaign_click',
          link_name: this.aali,
        });
      }
    },
  },
};

export default UtagBehavior;
