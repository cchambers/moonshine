<template>
  <div class="belk-mega-nav"
    v-bind:class="{ active: active, mobile: mobile }">
    <div class="close-trigger" v-show="mobile" v-hammer:tap="hide">
      <i class="material-icons-round">close</i>
    </div>
    <slot></slot>
  </div>
</template>

<script src="../script/BelkMegaNav.js"></script>
<style lang="scss" src="../style/default.scss"></style>
