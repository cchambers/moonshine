<template>
  <div class="sh-banner"
    :variant="variant"
    :hidden="!revealed">
    <div class="banner-background"
      :class="background"
      :animate="animate" ref="content" v-html="html">
        <slot></slot>
      </div>
  </div>
</template>

<script src="../script/Banner.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
