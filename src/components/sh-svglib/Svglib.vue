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
  export default {
    name: 'Svglib',
    data() {
      return {
        icons: require('./svg/icons.json')
      }
    },

    mounted() {
      this.$bus.$on('icon-setup', this.setup);
    },

    methods: {
      setup(el) {
        el.viewbox = this.icons[el.name].viewbox
      }
    }
  }
</script>
<style lang="scss" src="./style/default.scss"></style>
