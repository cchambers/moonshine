export default {
  name: 'Accordion',
  
  props: {
    group: String
  },

  data() {
    return {
      ariaExpanded: false
    }
  },

  created() {
    this.ariaControlsId = `ac-${this.uuid}`;
    this.headerId = `ah-${this.uuid}`;
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
      let payload = (this.group) ? { uuid: this.uuid, group: this.group } : { uuid: this.uuid };
      this.$bus.$emit('accordion-closing', payload);
      this.ariaExpanded = false;
      this.$bus.$emit('accordion-closed', payload);
    },

    open() {
      let payload = (this.group) ? { uuid: this.uuid, group: this.group } : { uuid: this.uuid };
      this.$bus.$emit('accordion-opening', payload);
      this.ariaExpanded = true;
      this.$bus.$emit('accordion-opened', payload);
    },

    events() {
      if (typeof this.group != undefined) {
        this.$bus.$on('accordion-opening', (data) => {
          if (data.group) {
            if (data.group == this.group && !this.active) this.close();
          }
        });
      }
    },
  },

}