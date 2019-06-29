<template>
  <div class="belk-app-banner" :class="{ active: active }">
    <div v-hammer:tap="close" class="close">
      <i class="material-icons">close</i>
    </div>
    <div v-hammer:tap="navigate" class="icon"></div>
    <div v-hammer:tap="navigate" class="data">
      <div class="name">
        <slot name="name">{{ name }}</slot>
      </div>
      <div class="price">
        <slot name="price">{{ price }}</slot>
      </div>
    </div>
    <div v-hammer:tap="navigate" class="link">
      {{ ctaText }}
    </div>
  </div>
</template>
  
<script src="../script/AppBanner.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>