<template>
  <div class="sh-dropnav" v-bind:class="{ 'is-open': isOpen }">
    <div class="wrapper">
      <div hidden><slot></slot></div>
      <button ref="button" v-hammer:tap="toggleOpen">{{ activeItem }}</button>
      <ul class="item-container">
        <li v-for="(item, index) in items" v-bind:key="item.key">
          <div v-if="!item.hidden"
          v-bind:class="{ 'active': item.active }"
          :data-key="index"
          :href="item.link"
          v-hammer:tap="clickHandler">{{ item.text }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Dropnav',
  props: {
    noActiveText: Boolean,
    listVariant: String,
    placeholder: String,
  },

  data() {
    return {
      activeItem: '',
      list: Object,
      isOpen: false,
      items: [],
    };
  },

  mounted() {
    this.process();
    this.activeItem = this.placeholder || 'Select';
  },

  methods: {
    events() {
      this.$on('selected', (data) => {
        this.setActive(data.text);
        this.closeList();
      });
    },

    process() {
      const html = this.$slots.default[0].elm;
      const items = html.querySelectorAll('li > *');
      const arr = [];
      items.forEach((link) => {
        const obj = {
          link: link.getAttribute('href') || false,
          text: link.innerText,
          value: link.getAttribute('value') || false,
          active: link.getAttribute('active') || false,
        };
        arr.push(obj);
      });

      this.items = arr;
    },

    setActive(text) {
      this.activeItem = text;
    },

    toggleOpen() {
      if (this.isOpen) {
        this.closeList();
      } else {
        this.openList();
      }
    },

    openList() {
      this.isOpen = true;
    },

    closeList() {
      this.isOpen = false;
    },

    clickHandler(e) {
      if (this.eventOnly) e.preventDefault();
      const { key } = e.target.dataset;
      if (key) {
        for (let x = 0, l = this.items.length; x < l; x += 1) {
          const item = this.items[x];
          if (item.active) this.deactivate(x);
        }
      }
      this.activate(key);
    },

    activate(key) {
      const item = this.items[key];
      this.$set(item, 'active', true);
      this.$bus.$emit('dropnav-value-changed', {
        el: this,
        value: item,
      });
      this.$emit('selected', item);
    },

    deactivate(key) {
      this.$set(this.items[key], 'active', false);
    },
  },

};
</script>

<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
