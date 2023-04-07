<template>
  <div class="belk-bus" />
</template>

<script>
import ComponentPrototype from '../../../utils/component-prototype';

export default {

  name: 'BelkBus',
  mixins: [ComponentPrototype],

  methods: {
    on(trigger, callback) {
      this.$bus.$on(trigger, callback);
    },
    emit(trigger, data = {}) {
      this.$bus.$emit(trigger, data);
    },
  },

};
</script>
<style lang="scss">
  belk-bus {
    display: none;
  }
</style>
