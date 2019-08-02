<template>
  <div class="belk-header">
    <div ref="pre" class="pre">
      <div class="contain">
        <slot name="pre-header"></slot>
      </div>
    </div>

    <div ref="primary" class="primary">
      <div class="contain">
        <slot name="promotion">FREE SHIPPING On Orders Over $49!</slot>
      </div>
    </div>

    <div ref="secondary" class="secondary">
      <div class="contain">
        <belk-logo class="logo" width="60" color="highlight-primary"></belk-logo>

        <sh-button class="nav-trigger" v-hammer:tap="menuHandler">
          <i class="material-icons-round">menu</i>
        </sh-button>
        
        <belk-search></belk-search>

        <div class="icon-bar">

          <a name="coupons">
            <i class="material-icons-round">local_offer</i>
            <span>Coupons</span>
          </a>

          <a name="account">
            <i class="material-icons-round">person_outline</i>
         
              <div>Sign In</div>
              <i class="material-icons-round">expand_more</i>
          </a>

          <belk-bag ref="bag" count="10" price="1234.53"></belk-bag>
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

<script src="../script/BelkHeader.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>

