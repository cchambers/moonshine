<template>
  <div class="belk-swatch"
    :variant="variant">
    <div class="swatch-name"><strong>{{ prefix }}:</strong> {{ selectedName }}</div>
    <div hidden><slot></slot></div>
    <ul class="swatch-list">
      <li v-for="(item, index) in items" v-bind:key="item.id"
        class="belk-swatch-actual"
        v-bind:class="{ highlight: item.active }"
        role="option"
        :id="item.id"
        tabindex="0"
        :aria-selected="item.highlighted"
        :style="{ backgroundImage: `url('${item.img}')`}">
        <button v-hammer:tap="handleClick" :value="index"></button>
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
      defaultContent: '',
      prefix: 'Color',
      selectedName: 'none',
      items: [],
    };
  },

  mounted() {
    this.defaultContent = this.$slots.default[0].elm;
    this.process(this.defaultContent);
  },

  methods: {
    process(el) {
      const data = [];
      for (const child of el.children) {
        data.push(this.makeData(child));
      }
      this.items = data;
    },

    makeData(el) {
      const data = {};
      const child = el.children[0];
      const image = child.children[0];
      data.name = child.getAttribute('title');
      data.colorValue = el.getAttribute('data-colorvalue');
      data.product = child.getAttribute('data-product');
      data.link = child.getAttribute('href');
      data.img = image.src;
      data.active = false;
      data.thumb = JSON.parse(image.getAttribute('data-thumb'));
      return data;
    },

    handleClick(e) {
      const { target } = e;
      const { value } = target;
      this.activate(value);
    },

    activate(id) {
      const which = parseInt(id, 0);

      for (let x = 0, l = this.items.length; x < l; x += 1) {
        if (x === which || parseInt(this.items[x].colorValue, 0) === which) {
          this.$set(this.items[x], 'active', true);
          this.selectedName = this.items[x].name;
        } else if (this.items[x].active) {
          this.$set(this.items[x], 'active', false);
        }
      }
    },
  },

};
</script>
<style lang="scss" src="./style/default.scss"></style>
<style lang="scss" src="./style/primary.scss"></style>
