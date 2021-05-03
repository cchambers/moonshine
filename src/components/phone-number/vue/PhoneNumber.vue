<template>
  <div class="phone-number"
    :variant="variant">
    <a class="high-off"
      :href="'tel:' + this.raw"
      :title="'Place a call to ' + this.raw">{{ phoneNumber }}</a>
    <span class="low-off">{{ phoneNumber }}</span>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'PhoneNumber',

  props: {
    in: {
      type: String,
      default: null,
    },
  },

  computed: {
    phoneNumber() {
      this.raw = (this.in).replace(/\D/g, '');
      const match = this.raw.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
      }
      return null;
    },
  },

  data() {
    return {
      formatted: null,
      raw: null,
    };
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
