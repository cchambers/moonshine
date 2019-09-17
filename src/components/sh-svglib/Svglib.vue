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
  //import ComponentPrototype from '../../components/component-prototype';

export default {
  //mixins: [ComponentPrototype],

    name: 'Svglib',
    data() {
      return {
        icons: require('./svg/icons.json')
      }
    },

    mounted() {
      this.$bus.$on('icon-setup', this.setup);
      this.$bus.$emit('icons-ready');
    },

    methods: {
      setup(el) {
        el.viewbox = this.icons[el.name].viewbox;
        el.configured = true;
      }
    }
  }
</script>
<style lang="scss" src="./style/default.scss"></style>
