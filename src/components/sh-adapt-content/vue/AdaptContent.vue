<template>
  <span :id="id" class="sh-adapt-content"
    :variant="variant">
    <span hidden><slot name="default"></slot></span>
    <div ref="smContent" v-html="smContent"><slot name="sm">{{ sm }}</slot></div>
    <div ref="mdContent" v-html="mdContent"><slot name="md">{{ md }}</slot></div>
    <div ref="lgContent" v-html="lgContent"><slot name="lg">{{ lg }}</slot></div>
    <div ref="xlContent" v-html="xlContent"><slot name="xl">{{ xl }}</slot></div>
  </span>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'AdaptContent',
  props: {
    sm: String,
    md: String,
    lg: String,
    xl: String,
    elementLevel: Boolean,
    uniqueId: String,
  },

  data() {
    return {
      id: String,
      defaultContent: '',
      smContent: '',
      mdContent: '',
      lgContent: '',
      xlContent: '',
      resizeTimer: 0,
      width: 0,
    };
  },

  computed: {
    state() {
      let state = 'def';
      if (this.width < 480) {
        state = 'sm';
      }
      return state;
    },
  },

  methods: {
    resizeHandler() {
      this.checkState();
    },

    checkState() {
      let width = 0;
      if (this.elementLevel) {
        width = this.$el.parentElement.offsetWidth;
      } else {
        width = window.innerWidth;
      }
      return width;
    },

    events() {
      const resizeDebounced = this.debounce(this.resizeHandler, 100);
      window.addEventListener('resize', resizeDebounced, true);
    },
  },

  mounted() {
    if (this.uniqueId) {
      this.id = this.uniqueId;
    } else {
      this.setUUID();
      this.id = `ac-${this.uuid}`;
    }

    if (this.$slots.default) this.defaultContent = this.$slots.default[0].elm.innerHTML;
    if (this.$slots.sm) this.smContent = this.$slots.sm[0].elm.innerHTML;
    if (this.$slots.md) this.mdContent = this.$slots.md[0].elm.innerHTML;
    if (this.$slots.lg) this.lgContent = this.$slots.lg[0].elm.innerHTML;
    if (this.$slots.xl) this.xlContent = this.$slots.xl[0].elm.innerHTML;

    if (!this.smContent) this.smContent = this.sm || this.defaultContent;
    if (!this.mdContent) this.mdContent = this.md || this.smContent;
    if (!this.lgContent) this.lgContent = this.lg || this.mdContent;
    if (!this.xlContent) this.xlContent = this.xl || this.lgContent;
  },
};
</script>


<style type="text/css">
  sh-adapt-content {
    display: inline-block;
  }
</style>
