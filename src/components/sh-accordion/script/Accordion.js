/* eslint-disable max-len */
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Accordion',

  props: {
    group: String,
    uniqueId: String,
    closedIcon: String,
    openIcon: String,
    variant: String,
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

  computed: {
    iconHandler() {
      let icon;
      if (this.ariaExpanded) {
        icon = this.removeIcon();
      } else {
        icon = this.addIcon();
      }
      return icon;
    },
  },

  methods: {
    removeIcon() {
      let icon;
      switch (this.variant) {
        case 'tertiary':
          icon = 'more_vert';
          break;
        default:
          icon = 'remove';
          break;
      }
      return icon;
    },

    addIcon() {
      let icon;
      if (this.closedIcon) return this.closedIcon;
      switch (this.variant) {
        case 'tertiary':
          icon = 'more_vert';
          break;
        default:
          icon = 'add';
          break;
      }
      return icon;
    },

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
      setTimeout(() => {
        this.$el.scrollIntoView();
      }, 100);
    },

    events() {
      if (this.group) {
        this.$bus.$on('accordion-opening', (data) => {
          if (data.group) {
            if (data.group === this.group && !this.active) this.close();
          }
        });
      }

      this.$bus.$on('accordion-trigger', (data) => {
        if (data.which === this.uniqueId) this.toggleActive();
        if (data.origin) data.origin.setAttribute('aria-expanded', this.ariaExpanded);
        if (data.target) {
          if (data.target.hasAttribute('focus-me')) data.target.scrollIntoView();
        }
      });

      this.$bus.$on('hashchange', this.hashHandler);
    },

    hashHandler(data) {
      const { hash, event } = data;
      if (hash === '') {
        if (this.active) this.close();
      } else if (hash === this.uniqueId) {
        event.preventDefault();
        this.open();
        this.$el.scrollIntoView();
      }
    },
  },

};
