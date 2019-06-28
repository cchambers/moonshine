<template>
  <div class="belk-app-banner" :class="{ active: active }">
    <div :click="close" class="close">
      <i class="material-icons">close</i>
    </div>
    <div :click="navigate" class="icon"></div>
    <div :click="navigate" class="data">
      <div class="name">Belk</div>
      <div class="price">free</div>
    </div>
    <div :click="navigate" class="link">
      View
    </div>
  </div>
</template>
  
<script src="../script/AppBanner.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>