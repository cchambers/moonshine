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
          <a class="icon-bar-icon" href="coupons">
            <belk-icon width="30" name="coupon"></belk-icon>
            <div>Coupons</div>
          </a>

          <div class="icon-bar-icon">
            <sh-nav-item delay-on-mouse-out="400" delay-on-mouse-over="400" variant="primary">
              <a slot="reference" id="signin-link" href="#" class="highlight-quinary">
                <belk-icon width="30" name="person"></belk-icon>
                <div>Sign In</div>
              </a>
              <div id="signin-menu">
                <sh-button variant="primary">Sign in</sh-button>
                <sh-button>Create an Account</sh-button>
              </div>
            </sh-nav-item>
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

