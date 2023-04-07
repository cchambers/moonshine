<template>
  <form
    class="sh-form"
    :variant="variant"
  >
    <div>
      <slot />
    </div>
    <div
      ref="errors"
      class="errors"
    >
      <ul v-if="errors.length > 0 && combineErrors">
        <li
          v-for="(error, index) in errors"
          :key="error.key"
        >
          <a
            v-if="!error.hidden"
            v-hammer:tap="errorClickHandler"
            :data-key="index"
            :href="error.link"
          >{{ error.text }} </a>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import ComponentPrototype from '../../../utils/component-prototype';

export default {
  name: 'Form',
  mixins: [ComponentPrototype],

  props: {
    combineErrors: {
      type: Boolean,
    },
  },

  data() {
    return {
      errors: [],
    };
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
