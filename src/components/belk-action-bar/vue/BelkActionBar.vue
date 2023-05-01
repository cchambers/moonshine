<template>
  <div class="belk-action-bar"
    :variant="variant">
    <div v-if="state === 'view1'"
      class="flex">
      <div>
        {{ content[state].text }}
      </div>
      <div>PRICE</div>
      <div>
        <sh-button variant="primary">Add to Bag</sh-button>
      </div>
    </div>
    <div v-if="state === 'view2'"
      class="flex">
        {{ content[state].text }}
    </div>
    <div v-if="state === 'view3'"
      class="flex">
        {{ content[state].text }}
    </div>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkActionBar',

  data() {
    return {
      content: {
        view1: {
          text: 'View One Data',
        },
        view2: {
          text: 'View Two Data',
        },
        view3: {
          text: 'View Three Data',
        },
      },
      state: 'view1',
    };
  },

  methods: {
    events() {
      // handle common data events
      // change state
      this.$bus.$on('action-bar-view', this.changeState);
    },

    changeState(data) {
      if (data.state) {
        this.loading = true;
        this.state = data.state;
        if (data.content) this.content[data.state] = { ...data.content };
        this.$nextTick(() => {
          this.loading = false;
        });
      }
    },
  },

};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
