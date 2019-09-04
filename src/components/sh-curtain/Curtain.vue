<template> 
  <div class="sh-curtain" v-bind:class="{ 'active': active }" v-hammer:tap="hide"></div>
</template>

<script>
export default {
  name: 'Curtain',

  data() {
    return {
      active: false,
    }
  },

  methods: {
    events() {
      this.$bus.$on('show-curtain', this.show);
      this.$bus.$on('hide-curtain', this.hide);
    },

    show(el) {
      console.log(el);
      if (el) {
        let _z = el.style.zIndex || 0;
        let pos = el.style.position;
        if (pos != "absolute" && pos != "relative") {
          el.style.pos = "relative";
        }
        if (_z < 8) {
          this.targetEl = el;
          el.style.zIndex = 9;
        }
      }
      this.$bus.$emit('curtain-showing');
      this.active = true;
      this.$bus.$emit('curtain-shown');
    },

    hide() {
      if (this.targetEl) {
        this.targetEl.style.zIndex = '';
        this.targetEl.style.position = '';
        this.targetEl = null;
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
    }
  }
}
</script>
<style lang="scss" src="./style/default.scss"></style>