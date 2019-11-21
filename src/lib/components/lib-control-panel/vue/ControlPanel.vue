<template>
  <div>
    <div class="show-nav nav-icon" v-hammer:tap="toggleNav">
      <i class="material-icons-round" :class="{ active: !navShown }">menu</i>
      <i class="material-icons-round" :class="{ active: navShown }">arrow_back</i>
    </div>
    <!-- <div class="close-curtain" v-hammer:tap="closeNav">
      <i class="material-icons-round nav-icon">close</i>
    </div> -->
    <div class="close-modal" v-hammer:tap="back">
      <i class="material-icons-round nav-icon">arrow_back</i>
    </div>

    <div class="theme-toggle" v-hammer:tap="toggleTheme">
      <i v-if="theme === 'dark'" class="material-icons-round nav-icon">toggle_on</i>
      <i v-else class="material-icons-round nav-icon">toggle_off</i>
    </div>
  </div>
</template>

<script src="../script/ControlPanel.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
<style lang="scss">
html {
  &.nav-shown {

    .close-curtain {
      transform: translateY(0) translateZ(0) !important;
    }

    main {
      max-width: calc(100vw - 26rem);
    }

    lib-nav {
      transform: translateX(0) translateZ(0) !important;
      transition: transform 300ms $ease;
    }
  }

  &.sh-modal-open {
    .close-modal {
      transform: translateX(0) translateZ(0) !important;
      opacity: 1;
    }
  }
}
</style>
