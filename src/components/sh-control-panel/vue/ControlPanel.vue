<template>
  <div>
    <div class="show-nav" v-on:click="toggleNav">
        <i class="material-icons nav-icon">menu</i>
      </div>
      <div class="close-curtain" v-on:click="closeNav">
        <i class="material-icons nav-icon">close</i>
      </div>
      <div class="close-modal" v-on:click="closeModal">
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
      transform: translateX(30rem) translateZ(0);
      transition: all 300ms ease-in-out;
    }
    #nav {
      transform: translateX(0) translateZ(0);
      transition: all 300ms ease-in-out;
      box-shadow: inset 1px 2px 2px rgba(0, 0, 0, 0.5);
    }
    #curtain {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  &.modal-shown {
    #modals .modal.active .content {
      border: 1px solid #ccc;
    }
  }
}
</style>