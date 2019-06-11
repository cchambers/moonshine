<template>
  <div>
    <div id="show-nav" v-on:click="navToggle">
        <i class="material-icons nav-icon">
          menu
        </i>
      </div>
      <div id="close-curtain" v-on:click="navToggle">
        <i class="material-icons nav-icon">close</i>
      </div>
      <div id="close-modal" v-on:click="closeModal">
        <i class="material-icons nav-icon">arrow_back</i>
    </div>
  </div>
</template>

<script src="../script/ControlPanel.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
