<template>
  <div class="sh-slider"
    :variant="variant"
    v-hammer:pan="panHandler">
    dist: {{ deltaX }}, {{ deltaY }} <br/>
    pos: {{ clickX }}, {{ clickY }}
  </div>
</template>

<script src="../script/Slider.js"></script>
<style lang="scss" src="../style/default.scss"></style>
