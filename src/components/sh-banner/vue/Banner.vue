<template>
  <div class="sh-banner"
    :variant="variant">
    <div class="banner-background" :class="background" :animate="animate">
      <slot></slot>
    </div>
  </div>
</template>

<script src="../script/Banner.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
