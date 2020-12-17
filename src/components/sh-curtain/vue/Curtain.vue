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
      if (old) {
        this.lastTargetEl = old;
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
        const z = target.style.zIndex || 0;
        const pos = target.style.position;
        if (pos !== 'absolute' && pos !== 'relative') {
          target.style.pos = 'relative';
        }
        if (z < 8) {
          this.targetEl = target;
          target.style.zIndex = 91;
          if (this.lastTarget) {
            this.lastTarget.style.zIndex = '';
            this.lastTarget.style.postition = '';
          }
          this.lastTarget = target;
        }
      }
      setTimeout(() => {
        this.$bus.$emit('curtain-showing');
        this.active = true;
        document.documentElement.classList.add('curtain');
        this.$bus.$emit('curtain-shown');
      });
    },

    hide() {
      this.$bus.$emit('curtain-hiding');
      this.active = false;
      document.documentElement.classList.remove('curtain');
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
