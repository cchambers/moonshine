<template>
  <div class="sh-carousel"
    :variant="variant"
    v-bind:class="{ 'snap-state': snapping }"
    v-hammer:tap="snap">
    <slot>{{ msg }}</slot>
  </div>
</template>

<script src="../script/Carousel.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
