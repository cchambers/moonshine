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
    receive: {
      type: String,
      default: 'default',
    },
  },

  data() {
    return {
      activeView: '',
      views: [],
    };
  },

  mounted() {
    const self = this;
    self.views = self.$el.children;
  },

  methods: {
    events() {
      const self = this;
      self.$bus.$on(`click-${this.receive}`, (data) => {
        console.log(data);
        self.activate(data.value);
      });
    },

    activate(id) {
      this.views.forEach((el) => {
        if (el.classList.contains('active')) el.classList.remove('active');
        if (el.id === id) {
          el.classList.add('active');
        }
      });
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
