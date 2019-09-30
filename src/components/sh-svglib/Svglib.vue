<template>
  <div class="sh-svglib">
    <svg>
      <defs>
        <g v-for="(data, name) in icons" v-bind:key="name" v-html="data.svg" :id="name"></g>
      </defs>
    </svg>
  </div>
</template>

<script>
import ComponentPrototype from '../component-prototype';

const iconJSON = require('./svg/icons.json');

export default {
  mixins: [ComponentPrototype],

  name: 'Svglib',
  data() {
    return {
      icons: iconJSON,
    };
  },

  mounted() {
    this.$bus.$on('icon-setup', this.setup);
    this.$bus.$emit('icons-ready');
  },

  methods: {
    setup(el) {
      const target = el;
      target.viewbox = this.icons[target.name].viewbox;
      target.configured = true;
    },
  },
};
</script>
<style lang="scss" src="./style/default.scss"></style>
