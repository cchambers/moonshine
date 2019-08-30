<template>
  <div class="belk-header">
    <div ref="pre" class="pre">
      <slot name="pre-header"></slot>
    </div>

    <div ref="primary" class="primary">
      <div class="contain">
        <div class="primary-promo">
          <slot name="promo"></slot>          
        </div>
        <!-- <div>
          <slot name="store-locator"></slot>          
        </div> -->
        <div class="primary-utility">
          <slot name="utility"></slot>    
        </div>
      </div>
    </div>

    <div ref="secondary" class="secondary">
      <div class="contain">
        <belk-search></belk-search>

        <sh-button class="nav-trigger" v-hammer:tap="menuHandler">
          <i class="material-icons-round">menu</i>
        </sh-button>

        <belk-logo class="logo" width="60"></belk-logo>

        <div class="icon-bar">
          <slot name="icon-bar"></slot>
        </div>
      </div>
    </div>
    <div ref="tertiary" class="tertiary">
      <div class="contain">
        <belk-mega-nav ref="meganav">
          <slot name="tertiary-nav"></slot>
        </belk-mega-nav>
      </div>
    </div>
    <div ref="post" class="post">
      <slot name="post-header"></slot>
    </div>
  </div>
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
        brd: 0,
        brc: 0,
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

