<template>
  <div class="belk-bus"></div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkBus',

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
