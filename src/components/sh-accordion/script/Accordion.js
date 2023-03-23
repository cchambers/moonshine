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
    checkboxLink: String,
    subcat: {
      type: Boolean,
      default: false,
    },
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
    const headerLink = this.$el.querySelector('button a');
    if (headerLink) {
      headerLink.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
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

      if (this.uniqueId) {
        const slug = `open-${this.uniqueId.slugify()}`;
        this.$bus.$on(slug, () => {
          this.toggleActive();
          if (this.subcat) {
            const cat = this.$el.closest('ul').closest('sh-accordion');
            if (cat) this.$bus.$emit(`open-${cat.uniqueId.slugify()}`);
          }
        });
      }

      this.$bus.$on('accordion-trigger', (data) => {
        if (data.which === this.uniqueId) this.toggleActive();
        if (data.origin) {
          data.origin.setAttribute('aria-expanded', this.ariaExpanded);
          if (data.origin.hasAttribute('focus-me')) {
            setTimeout(() => {
              data.origin.scrollIntoView();
            }, 101);
          }
        }
      });

      if (this.checkboxLink) {
        const linkedEl = document.getElementById(this.checkboxLink);
        if (linkedEl) {
          linkedEl.addEventListener('change', () => {
            if (linkedEl.checked) {
              this.open();
            } else {
              this.close();
            }
          });
        } else {
          this.log(`checkbox-link element does not exist. id: ${this.uniqueId}`);
        }
      }

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
