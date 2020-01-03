<template>
  <div class="sh-carousel"
    :variant="variant"
    @mouseenter="mousePause(true, true)"
    @mouseleave="mousePause(false, true)"
    v-hammer:swipe="swipeHandler"
    v-hammer:tap="pause">
    <div class="carousel-spacer"></div>
    <div ref="slides" slot="slides" class="slides">
      <slot name="slides"></slot>
    </div>
    <div class="controls">
      <div v-if="!hideArrows" class="arrow next" v-hammer:tap="next">
        {{ nextIcon }}
      </div>
      <div v-if="!hideArrows" class="arrow previous" v-hammer:tap="previous">
        {{ previousIcon }}
      </div>
      <div v-if="!hideDots" class="dots">
        ...
      </div>
      <div class="button play" v-hammer:tap="play">
        {{ mode }}
      </div>
    </div>
  </div>
</template>

<script src="../script/Carousel.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
