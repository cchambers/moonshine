<template>
  <div class="sh-carousel"
    :variant="variant">
    <div class="carousel-spacer"></div>
    <div ref="slides" slot="slides" class="slides">
      <slot name="slides"></slot>
    </div>
    <div class="controls">
      <div class="arrow next" @click="next">
        next slide
      </div>
      <div class="arrow previous" @click="previous">
        previous slide
      </div>

      <div class="reload" @click="reload"></div>
      <!-- Control layer. Dots/arrows, etc. -->
    </div>
  </div>
</template>

<script src="../script/Carousel.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
