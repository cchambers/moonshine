<template>
  <div class="belk-mega-nav"
    v-bind:class="{ active: active, mobile: mobile }"
    @mouseleave="mouseleaveHandler">
    <div class="close-trigger" v-show="mobile" v-hammer:tap="hide">
      <i class="material-icons-round">close</i>
    </div>
    <slot></slot>
    <div class="mobile-links" v-show="mobile">
      <nav>
        <ul>
          <li>
            <a href="#">Sign In</a>
          </li>
          <li>
            <a href="#">Store Locator</a>
          </li>
          <li>
            <a href="#">Find My Order</a>
          </li>
          <li>
            <a href="#">Customer Service</a>
          </li>
          <li>
            <a href="#">Coupons</a>
          </li>
          <li>
            <a href="#">Belk Rewards Credit Card</a>
          </li>
          <li>
            <a href="#">Gift Cards</a>
          </li>
          <li>
            <a href="#">Wish List</a>
          </li>
          <li>
            <a href="#">Registry</a>
          </li>
          <li>
            <a href="#">FAQs</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script src="../script/BelkMegaNav.js"></script>
<style lang="scss" src="../style/default.scss"></style>
