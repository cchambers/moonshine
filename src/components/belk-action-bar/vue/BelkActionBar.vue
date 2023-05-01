<template>
  <div class="belk-action-bar"
    :variant="variant">
    <div v-if="state === 'view1' && !loading"
      class="flex">
      <div>
        {{ content[state].text }}
      </div>
      <div><component
        :is="belkPrice"
        :price="pull('price')"
        :sale_price="pull('sale_price')"
        :show-percent="pull('showPercent')"></component></div>
      <div>
        <sh-button variant="primary" click-event="add-to-bag">Add to Bag</sh-button>
      </div>
    </div>
    <div v-if="state === 'view2' && !loading"
      class="flex">
        {{ pull('text') }}
    </div>
    <div v-if="state === 'view3' && !loading"
      class="flex">
        {{ pull('text') }}
    </div>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';
import BelkProduct from '../../belk-product/vue/BelkProduct.vue';
import BelkPrice from '../../belk-price/vue/BelkPrice.vue';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkActionBar',

  data() {
    return {
      content: {
        view1: {
          text: 'View One Data',
          price: 100,
        },
        view2: {
          text: 'View Two Data',
        },
        view3: {
          text: 'View Three Data',
        },
      },
      state: 'view1',
      belkProduct: BelkProduct,
      belkPrice: BelkPrice,
      loading: false,
    };
  },

  methods: {
    events() {
      // handle common data events
      // change state
      this.$bus.$on('action-bar-view', this.changeState);
    },

    pull(val) {
      let ret;
      if (this.content[this.state]) ret = this.content[this.state][val] || '';
      return ret;
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
