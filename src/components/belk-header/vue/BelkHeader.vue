<template>
  <div class="belk-header">
    <div ref="pre" class="pre">
      <slot name="pre-header"></slot>
    </div>

    <div ref="primary" class="primary">
      <div class="contain">
        <div>Lorem</div>
        <div>Ipsum</div>
        <div>Doler</div>
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
          <div class="icon-bar-icon">
            <i class="material-icons-round">local_offer</i>
            <div>Coupons</div>
          </div>

          <div class="icon-bar-icon">
            <i class="material-icons-round">person_outline</i>
            <div>Sign In</div>
          </div>

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

