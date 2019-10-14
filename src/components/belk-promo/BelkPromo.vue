<template>
  <div class="belk-promo">
    <div v-if="data.brd > 0" class="rewards-dollars">
      You have ${{data.brd}} Belk Reward Dollars<span class="line-combinator" aria-hidden="true">&nbsp;+&nbsp;</span>
    </div>
    <div class="free-shipping" v-html="shipping"></div>
  </div>
</template>

<script>
  import ComponentPrototype from '../component-prototype';

  export default {
    mixins: [ComponentPrototype],

    name: 'BelkPromo',

    props: {
      freeShipping: {
        type: String,
        default: '99'
      }
    },

    data() {
      return {
        data: {
          brd: null,
          brc: ''
        }
      }
    },

    computed: {
      shipping() {
        let string;
        let brd = this.data.brd || 0;
        let brc = this.data.brc || '';
        brc = brc.toLowerCase();
        switch (brc) {

          case 'elite': 
            if (brd == 0) {
              string = `Elites get <span class="uppercase">free shipping</span> every day!`;
            } else {
              string = `Free Shipping for Elites`;
            }
          break;

          default:
            if (!this.data.brd) {
              string = `<span class="uppercase">Free shipping</span> @ $${this.freeShipping}!`;
            } else {
              string = `Free Shipping @ $${this.freeShipping}!`;
            }
          break;
        }

        return string;
      }
    },

    mounted() {
      let self = this;
      self.setupEvents();
      setTimeout( () => {
        self.$bus.$emit('get-user-data');
      }, 10)
    },
    
    methods: {
      setupEvents() {
        this.$bus.$on('user-data', this.handleData);
      },

      handleData(data) {
        if (data.brd) this.$set(this.data, 'brd', data.brd);
        if (data.brc) this.$set(this.data, 'brc', data.brc);
      }
    }
  }
</script>
<style lang="scss" src="./style/default.scss"></style>
