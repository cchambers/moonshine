<template>
  <div class="sh-curtain" v-bind:class="{ 'active': active }" v-hammer:tap="hide"></div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'Curtain',

  data() {
    return {
      active: false,
      targetEl: false,
      lastTargetEl: false,
    };
  },

  watch: {
    targetEl(val, old) {
      if (val !== old) {
        this.lastTargetEl = old;
      } else {
        this.lastTargetEl = val;
      }
    },
  },

  methods: {
    events() {
      this.$bus.$on('show-curtain', this.show);
      this.$bus.$on('hide-curtain', this.hide);
    },

    show(el) {
      const target = el;
      if (target) {
        const zIndex = target.style.zIndex || 0;
        const pos = target.style.position;
        if (pos !== 'absolute' && pos !== 'relative') {
          target.style.pos = 'relative';
        }
        if (zIndex < 8) {
          this.targetEl = target;
          target.style.zIndex = 91;
          console.log('SET Z', target);
        }
      }
      setTimeout(() => {
        this.$bus.$emit('curtain-showing');
        this.active = true;
        this.$bus.$emit('curtain-shown');
      });
    },

    hide() {
      if (this.lastTargetEl) {
        this.lastTargetEl.style.zIndex = '';
        this.lastTargetEl.style.position = '';
        this.lastTargetEl = null;
      }
      this.$bus.$emit('curtain-hiding');
      this.active = false;
      this.$bus.$emit('curtain-hidden');
    },

    toggle() {
      if (this.active) {
        this.hide();
      } else {
        this.show();
      }
    },

    clickHanlder() {
      this.hide();
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
