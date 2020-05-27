<template>
  <div class="sh-view-swapper"
    :variant="variant"
    role="tablist">
    <slot></slot>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'ViewSwapper',

  props: {
    active: {
      type: Number,
      default: 0,
    },

    receive: {
      type: String,
      default: 'default',
    },
  },

  watch: {
    active(which) {
      // do ADA stuff for "which"
      this.log(which);
    },
    views(v) {
      if (v.length > 0) {
        this.activate(this.active);
        this.ADA();
      }
    },
  },

  data() {
    return {
      activeView: undefined,
      views: [],
      labelledBy: String,
    };
  },

  mounted() {
    const self = this;
    setTimeout(() => {
      self.views = self.$el.children;
    });
  },

  methods: {
    events() {
      const self = this;
      self.$bus.$on(`click-${this.receive}`, (data) => {
        self.activate(data.value);
      });

      self.$bus.$on('value-changed', (data) => {
        if (data.group === self.receive) {
          self.activate(data.value);
        }
      });
    },

    activate(id) {
      const which = (typeof id === 'string') ? this.strProcess(id) : this.numProcess(id);
      this.views.forEach((el) => {
        if (el.classList.contains('active')) el.classList.remove('active');
      });
      this.views[which].classList.add('active');
      this.$bus.$emit('view-swapper-changed', { which, group: this.receive });
    },

    strProcess(str) {
      let which;
      this.views.forEach((el) => {
        if (el.id === str) which = el.id;
      });
      return which;
    },

    numProcess(num) {
      let which;
      this.views.forEach((el, index) => {
        if (index === num) which = el.id;
      });
      return which;
    },

    ADA() {
      this.views.forEach((el) => {
        el.setAttribute('aria-labelledby', 'test');
      });
    },
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
<style lang="scss" src="../style/secondary.scss"></style>
