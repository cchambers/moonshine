<template>
  <div class="belk-modal-options"
    :variant="variant">
    <ul ref="list" role="listbox">
      <li
        v-for="(item, index) in items"
        :key="index"
        tabindex="0"
        :class="{ active: item === activeItem }"
        :aria-selected="item === activeItem"
        role="option"
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

  watch: {
    activeItem() {
      this.emitSelected();
    },
  },

  methods: {
    events() {
      if (this.uniqueId) {
        const en = `modal-options-${this.uniqueId}`;
        this.$bus.$on(en, this.handleData);
        const get = `get-selected-${this.uniqueId}`;
        this.$bus.$on(get, this.emitSelected);
      }
    },

    handleData(e) {
      this.items = [...e];
    },

    activate(index) {
      this.activeItem = this.items[index];
      this.$bus.$emit('modal-options-updated', {
        which: this.uniqueId,
        selected: this.activeItem,
      });
    },

    emitSelected() {
      this.$bus.$emit(`modal-selected-${this.uniqueId}`, this.activeItem);
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
