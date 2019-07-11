<template>
  <div>
    <div class="show-nav" v-hammer:tap="toggleNav">
      <i class="material-icons nav-icon">menu</i>
    </div>
    <div class="close-curtain" v-hammer:tap="closeNav">
      <i class="material-icons nav-icon">close</i>
    </div>
    <div class="close-modal" v-hammer:tap="back">
      <i class="material-icons nav-icon">arrow_back</i>
    </div>

    <div class="theme-toggle" v-hammer:tap="toggleTheme">
      <i v-if="theme == 'dark'" class="material-icons nav-icon">toggle_on</i>
      <i v-else class="material-icons nav-icon">toggle_off</i>
    </div>
  </div>
</template>

<script src="../script/ControlPanel.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
<style lang="scss">
html {
  &.nav-shown {
    .show-nav {
      transform: translateX(30rem) translateZ(0) !important;
    }
    .close-curtain {
      transform: translateY(0) translateZ(0) !important;
    }
    #page {
      transform: translateX(15rem) translateZ(0) !important;
      transition: transform 300ms $ease;
    }
    lib-nav {
      transform: translateX(0) translateZ(0) !important;
      transition: transform 300ms $ease;
    }
    sh-curtain {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  &.sh-modal-open {
    .close-modal {
      transform: translateX(0rem) translateZ(0) !important;
      opacity: 1;
    }
    .show-nav {
      transform: translateX(30rem) translateZ(0) !important;
    }
  }
}
</style>