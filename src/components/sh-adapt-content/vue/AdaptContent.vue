<template>
  <span
    :id="id"
    class="sh-adapt-content"
    :variant="variant"
  >
    <div
      class="content"
      :class="{ active: this.state == 'def' }"
    ><slot name="default" /></div>
    <div
      ref="smContent"
      class="content"
      :class="{ active: this.state == 'sm' }"
      v-html="content.sm"
    ><slot name="sm">{{ sm }}</slot></div>
    <div
      ref="mdContent"
      class="content"
      :class="{ active: this.state == 'md' }"
      v-html="content.md"
    ><slot name="md">{{ md }}</slot></div>
    <div
      ref="lgContent"
      class="content"
      :class="{ active: this.state == 'lg' }"
      v-html="content.lg"
    ><slot name="lg">{{ lg }}</slot></div>
    <div
      ref="xlContent"
      class="content"
      :class="{ active: this.state == 'xl' }"
      v-html="content.xl"
    ><slot name="xl">{{ xl }}</slot></div>
  </span>
</template>

<script>
import ComponentPrototype from '../../../utils/component-prototype';

export default {

  name: 'AdaptContent',
  mixins: [ComponentPrototype],
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
      content: {
        def: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
      },
      state: 'def',
      width: 0,
    };
  },

  mounted() {
    if (this.uniqueId) {
      this.id = this.uniqueId;
    } else {
      this.setUUID();
      this.id = `ac-${this.uuid}`;
    }

    if (this.$slots.default) this.$set(this.content, 'def', this.$slots.default[0].elm.innerHTML);
    if (this.$slots.sm) this.$set(this.content, 'sm', this.$slots.sm[0].elm.innerHTML);
    if (this.$slots.md) this.$set(this.content, 'md', this.$slots.md[0].elm.innerHTML);
    if (this.$slots.lg) this.$set(this.content, 'lg', this.$slots.lg[0].elm.innerHTML);
    if (this.$slots.xl) this.$set(this.content, 'xl', this.$slots.xl[0].elm.innerHTML);

    if (!this.content.sm) this.$set(this.content, 'sm', (this.sm || this.content.def));
    if (!this.content.md) this.$set(this.content, 'md', (this.md || this.content.sm));
    if (!this.content.lg) this.$set(this.content, 'lg', (this.lg || this.content.md));
    if (!this.content.xl) this.$set(this.content, 'xl', (this.xl || this.content.lg));
  },

  methods: {
    checkState() {
      let state = 'def';
      this.width = (this.elementLevel) ? this.$el.parentElement.offsetWidth : window.innerWidth;
      const w = this.width;
      if (w >= 480) state = 'sm';
      if (w >= 768) state = 'md';
      if (w >= 960) state = 'lg';
      if (w >= 1200) state = 'xl';
      this.state = state;
      return state;
    },

    events() {
      this.$bus.$on('resize-event', this.checkState);
    },
  },
};
</script>

<style type="text/css" lang="scss">
  sh-adapt-content {
    display: block;
    .content {
      display: none;
      &.active {
        display: block;
      }
    }
  }
  sh-adapt-content[inline] {
    display: inline-block;
  }

</style>
