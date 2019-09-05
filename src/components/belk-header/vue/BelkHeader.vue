<template>
<div></div>
</template>

<script>
export default {
  name: 'BelkHeader',

  data() {
    return {
      bagEl: {},
      navEl: {},
      loggedIn: false,
      data: {
        name: 'Sign In',
        brd: 0, // dollars
        brc: 0, // tier
      }
    }
  },

  watch: {
    data(val) {
      this.$bus.$emit('user-data', val);
      if (val.name) this.updateUsername(val.name)
    }
  },

  mounted() {
    this.actual = document.querySelector('#header .belk-header');
    this.bagEl = document.querySelector('belk-bag');
    // this.navEl = this.$refs.meganav;
    // this.data = window.pageData;
  },

  methods: {
    events() {
      this.$bus.$on('mega-nav-opening');
      this.$bus.$on('bag-update', this.bagupdateHandler);
    },

    menuHandler() {
      this.navEl.show();
    },

    bagupdateHandler(data) {
      if (!this.loggedIn) {
        this.bagState(0);
      } else {
        if (data.count == 0) {
          this.bagState(1);
        } else {
          this.bagState(2);
        }
      }
    },

    bagState(num) {
      this.actual.setAttribute('bag-state', num)
    },

    updateUsername(name) {
      let els = this.querySelectorAll('.data-user-name');
      this.$el.classList.add('is-user');
      els.forEach(element => {
        element.innerText = name;
      });
    }
  },
}
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>

