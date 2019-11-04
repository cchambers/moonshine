import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Accordion',

  props: {
    group: String,
    uniqueId: String,
  },

  data() {
    return {
      ariaExpanded: false,
      accordionId: '',
    };
  },

  created() {
    this.setUUID();
    this.accordionId = (this.uniqueId) ? this.uniqueId : this.uuid;
    this.ariaControlsId = `ac-${this.accordionId}`;
    this.headerId = `ah-${this.accordionId}`;
  },

  mounted() {
    if (window.location.hash) this.hashHandler(window.location.hash.substr(1));
  },

  methods: {
    toggleActive() {
      if (this.ariaExpanded) {
        this.close();
      } else {
        this.open();
      }
    },

    close() {
      const payload = (this.group) ? { uuid: this.accordionId, group: this.group } : { uuid: this.accordionId };
      this.$bus.$emit('accordion-closing', payload);
      this.ariaExpanded = false;
      this.$bus.$emit('accordion-closed', payload);
    },

    open() {
      const payload = (this.group) ? { uuid: this.accordionId, group: this.group } : { uuid: this.accordionId };
      this.$bus.$emit('accordion-opening', payload);
      this.ariaExpanded = true;
      this.$bus.$emit('accordion-opened', payload);
    },

    events() {
      if (this.group) {
        this.$bus.$on('accordion-opening', (data) => {
          if (data.group) {
            if (data.group === this.group && !this.active) this.close();
          }
        });
      }

      this.$bus.$on('hashchange', this.hashHandler);
    },

    hashHandler(id) {
      if (id === '') {
        if (this.active) this.close();
      } else if (id === this.uniqueId) {
        this.open();
      }
    },
  },

};
