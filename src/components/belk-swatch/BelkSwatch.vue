<template>
  <div class="belk-swatch"
    :variant="variant">
    <div class="swatch-name"><strong>{{ prefix }}:</strong> {{ selectedName }}</div>
    <ul class="swatch-list">
      <li v-for="item in items" v-bind:key="item.id"
        v-bind:class="{ highlight: item.selected }"
        role="option"
        :id="item.id"
        :aria-selected="item.highlighted">
        <a :href="buildSearchLink(item.q)">{{ item.q }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import ComponentPrototype from '../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkSwatch',

  props: {
  },

  data() {
    return {
      prefix: 'Color',
      selectedName: 'none',
      items: [],
    };
  },

  methods: {

  },

};
</script>
<style lang="scss" src="./style/default.scss"></style>
<style lang="scss" src="./style/primary.scss"></style>
