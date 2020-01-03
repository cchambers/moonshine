<template>
  <div class="sh-carousel"
    :variant="variant"
    @mouseenter="mousePause(true, true)"
    @mouseleave="mousePause(false, true)"
    v-hammer:swipe="swipeHandler"
    v-hammer:tap="pause">
    <div ref="spacer" class="carousel-spacer"></div>
    <div ref="slides" slot="slides" class="slides">
      <slot name="slides"></slot>
    </div>
    <div class="controls">
      <button v-if="!hideArrows" class="arrow next" v-hammer:tap="next">
        {{ nextIcon }}
      </button>
      <button v-if="!hideArrows" class="arrow previous" v-hammer:tap="previous">
        {{ previousIcon }}
      </button>
      <ul v-if="!hideDots" class="dots">
        <li>
          first slide
        </li>
        <li>
          second slide
        </li>
        <li>
          third slide
        </li>
      </ul>
      <button class="button play"
        :aria-label="{
          'Stop automatic slide show': paused,
          'Start automatic slide show': !paused,
          }"
          :disabled="isFocused"
        v-hammer:tap="play">
        {{ mode }}
      </button>
    </div>
  </div>
</template>

<script src="../script/Carousel.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
