<template>
  <div class="sh-view-swapper"
    :variant="variant">
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
  },

  data() {
    return {
      activeView: undefined,
      views: [],
    };
  },

  mounted() {
    const self = this;
    self.views = self.$el.children;
    self.activate(self.active);
  },

  methods: {
    events() {
      const self = this;
      self.$bus.$on(`click-${this.receive}`, (data) => {
        self.activate(data.value);
      });
    },

    activate(id) {
      let which = id;
      const str = (typeof which === 'string');
      this.views.forEach((el, index) => {
        if (el.classList.contains('active')) el.classList.remove('active');
        if (str) if (el.id === which) which = index;
      });
      this.views[which].classList.add('active');
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
