<template>
  <div class="belk-modal-options"
    :variant="variant">
    <ul ref="list">
      <li
        v-for="(item, index) in items"
        :key="item"
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
      items: ['one', 'two', 'three'],
      activeItem: null,
    };
  },

  methods: {
    events() {
      if (this.uniqueId) {
        const en = `modal-options-${this.uniqueId}`;
        this.$bus.$on(en, this.handleData);
      }
    },

    handleData(e) {
      console.log(e);
    },

    activate(index) {
      this.activeItem = this.items[index];
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
