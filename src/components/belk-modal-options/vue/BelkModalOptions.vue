<template>
  <div class="belk-modal-options"
    :variant="variant">
    <ul ref="list">
      <li
        v-for="(item, index) in items"
        :key="index"
        tabindex="0"
        :class="{ active: item === activeItem }"
        @keypress.space.prevent="activate(index)"
        @click="activate(index)">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkModalOptions',

  props: {
    uniqueId: {
      type: String,
    },
  },

  data() {
    return {
      items: [],
      activeItem: null,
    };
  },

  destroyed() {
    if (this.uniqueId) {
      const en = `modal-options-${this.uniqueId}`;
      this.$bus.$off(en, this.handleData);
    }
  },

  methods: {
    events() {
      if (this.uniqueId) {
        const en = `modal-options-${this.uniqueId}`;
        this.$bus.$on(en, this.handleData);
      }
    },

    handleData(e) {
      console.log(`modal-options-${this.uniqueId}`, e, this.$el);
      this.items = [...e];
    },

    activate(index) {
      this.activeItem = this.items[index];
      this.$bus.$emit('modal-options-updated', {
        which: this.uniqueId,
        selected: this.activeItem,
      });
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
