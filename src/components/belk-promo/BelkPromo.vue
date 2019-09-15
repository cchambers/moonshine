<template>
  <div class="belk-promo">
    <div v-if="data.brd > 0" class="rewards-dollars">
      You have ${{data.brd}} Belk Reward Dollars<span class="line-combinator" aria-hidden="true">&nbsp;+&nbsp;</span>
    </div>
    <div class="free-shipping" v-html="shipping"></div>
  </div>
</template>

<script>
  export default {
    name: 'BelkPromo',

    props: {
      freeShipping: {
        type: String,
        default: '99'
      }
    },

    data() {
      return {
        stateActual: 0,
        data: {
          brd: 12,
          brc: ''
        }
      }
    },

    computed: {
      state() {
        let state = 0;
        return state;
      },

      shipping() {
        let string;
        // if elite: return "Free Shipping every day"
        // else: return "Free Shipping @ ${this.freeShipping}"
        if (this.data.brc.toLowerCase() == "elite") {
          if (this.data.brd == 0) {
            string = `Elites get <span class="uppercase">free shipping</span> every day!`;
          } else {
            string = `Free Shipping for Elites`;
          }
        } else { // NOT ELITE
          if (this.data.brd == 0) {
            string = `<span class="uppercase">Free shipping</span> @ ${this.freeShipping}!`;
          } else {
            string = `Free Shipping @ $${this.freeShipping}!`;
          }
        }
        return string;
      }
    },
    
    methods: {
      events() {
        this.$bus.$on('user-data', this.handleData);
      },

      handleData(data) {
        this.$set(this, this.data, data);
      }
    }
  }
</script>
<style lang="scss" src="./style/default.scss"></style>
