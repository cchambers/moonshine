<template>
  <header class="belk-header">

    <!-- Primary Navigation -->
    <div class="primary-nav">
      <div class="container">

        <div class="logo">
          <slot name="logo"></slot>
        </div>

        <div class="nav-left">
          <!-- FIND A STORE LINK-->
          <slot name="find-a-store"></slot>
          <!-- PROMOTIONAL MESSAGE -->
          <slot name="promotion-message"></slot>
        </div>

        <div class="nav-right">
          <!-- REWARDS CARD -->
          <slot name=""></slot>
          <!-- GIFT CARD DROPDOWN -->
          <slot name=""></slot>
          <!-- WISH LIST LINK -->
          <slot name=""></slot>
           <!-- REGISTRY LINK -->
           <slot name=""></slot>
        </div>

      </div>
    </div>

    <!-- Secondary Navigation -->
    <div class="secondary-nav">
      <div class="container">

        <!-- NAVIGATION HAMBURGER -->
        <button class="navigation-trigger">
          <i class="icon-hamburger"></i>
          <span>Shop by Department</span>
        </button>

        <!-- STICKY LOGO -->
        <div class="logo">
          <slot name="logo"></slot>
        </div>

        <!-- SEARCH BAR -->
        <slot name="search-input"></slot>

        <!-- COUPONS LINK  -->
        <slot name="coupons"></slot>

        <!-- ACCOUNT DROPDOWN -->
        <slot name="accoung-dropdown"></slot>

        <!-- CART DROPDOWN -->
        <slot name="cart"></slot>

      </div>
    </div>

    <!-- Tertiary Navigation -->
    <div class="tertiary-nav">
      <div class="container">

        <!-- MEGA MENU L1 LINKS -->

        <!-- MEGA MENU L2 LINKS -->

      </div>
    </div>

  </header>
</template>

<script src="../script/BelkHeader.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
<style lang="scss" src="../style/primary.scss" scoped></style>
