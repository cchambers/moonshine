<template>
  <div class="sh-slider"
   :variant="variant"
   v-bind:class="{ 'snap-state': snapping }"
   v-hammer:tap="snap">
    <slot>{{ msg }}</slot>
  </div>
</template>

<script src="../script/Slider.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
