<template>
  <div class="sh-flower"
    :variant="variant"
    v-bind:class="{ 'snap-state': snapping }"
    v-hammer:tap="snap">
    <slot>{{ msg }}</slot>
  </div>
</template>

<script src="../script/Flower.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
