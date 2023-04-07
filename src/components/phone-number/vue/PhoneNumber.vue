<template>
  <div
    class="phone-number"
    :variant="variant"
  >
    <a
      class="high-off"
      :href="'tel:' + this.raw"
      :title="'Place a call to ' + this.raw"
    >{{ phoneNumber }}</a>
    <span class="low-off">{{ phoneNumber }}</span>
  </div>
</template>

<script>
import ComponentPrototype from '../../../utils/component-prototype';

export default {

  name: 'PhoneNumber',
  mixins: [ComponentPrototype],

  props: {
    in: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      formatted: null,
      raw: null,
    };
  },

  computed: {
    phoneNumber() {
      this.raw = (this.in).replace(/\D/g, '');
      const match = this.raw.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        const intlCode = (match[1] ? '+1 ' : '');
        return [intlCode, '', match[2], '-', match[3], '-', match[4]].join('');
      }
      return this.raw;
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
