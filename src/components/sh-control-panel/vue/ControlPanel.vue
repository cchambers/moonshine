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
  </div>
</template>

<script src="../script/ControlPanel.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
<style lang="scss">
html {
  &.nav-shown {
    .show-nav {
      transform: translateX(30rem) translateZ(0);
    }
    .close-curtain {
      transform: translateY(0) translateZ(0);
    }
    #page {
      transform: translateX(15rem) translateZ(0);
      transition: all 300ms $ease;
    }
    #nav {
      transform: translateX(0) translateZ(0);
      transition: all 300ms $ease;
    }
    #curtain {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  &.sh-modal-open {
    .close-modal {
      transform: translateX(0rem) translateZ(0);
      opacity: 1;
    }
    .show-nav {
      transform: translateX(30rem) translateZ(0);
    }
  }
}
</style>