<template>
  <div class="sh-carousel"
    :variant="variant">
    <div class="carousel-spacer"></div>
    <div ref="slides" slot="slides" class="slides">
      <slot name="slides"></slot>
    </div>
    <div ref="control">
      <!-- Control layer. Dots/arrows, etc. -->
    </div>
  </div>
</template>

<script src="../script/Carousel.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
