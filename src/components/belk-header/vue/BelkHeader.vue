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
    this.bagEl = this.$refs.bag;
    this.navEl = this.$refs.meganav;
    // this.data = window.pageData;
  },

  methods: {
    events() {
      this.$bus.$on('mega-nav-opening');
    },

    menuHandler() {
      this.navEl.show();
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

