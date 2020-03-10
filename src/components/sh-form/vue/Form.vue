<template>
  <form class="sh-form"
    :variant="variant">
    <div>
      <slot></slot>
    </div>
    <div ref="errors" class="errors">
      <ul v-if="errors.length > 0 && combineErrors">
        <li v-for="(error, index) in errors" v-bind:key="error.key">
        <a v-if="!error.hidden"
        :data-key="index"
        :href="error.link"
        v-hammer:tap="errorClickHandler">{{ error.text }} </a>
      </li>
      </ul>
    </div>
  </form>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],
  name: 'Form',

  props: {
    combineErrors: false,
  },

  data() {
    return {
      errors: [],
    };
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
