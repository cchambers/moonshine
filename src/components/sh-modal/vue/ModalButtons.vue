
<template>
  <div class="sh-modal-buttons">
    <div class="tab-lock" v-on:focus="modalFocusLast()" tabindex="0"></div>
    <button close-trigger>
      <belk-icon v-if="closeActive" name="close" width="28">Close Modal</belk-icon>
    </button>
    <button v-if="printActive" print-trigger hidden>
      <belk-icon name="print" width="28">Print Modal Content</belk-icon>
    </button>
    <div class="tab-lock" v-on:focus="modalFocusFirst()" tabindex="0"></div>
  </div>
</template>

<script>
/* eslint-disable no-restricted-globals */
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'ModalButtons',

  data() {
    return {
      printActive: false,
      closeActive: true,
    };
  },

  methods: {
    doPrint() {
      window.print();
    },

    modalFocusFirst() {
      this.$bus.$emit('modal-focus-first');
    },

    modalFocusLast() {
      this.$bus.$emit('modal-focus-last');
    },

    events() {
      this.$bus.$on('modal-buttons-focus', () => {
        this.$el.querySelector('button').focus();
      });
    },
  },
};
</script>
