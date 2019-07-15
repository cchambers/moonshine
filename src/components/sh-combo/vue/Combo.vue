<template>
  <div class="sh-combo"
    :variant="variant"
    v-bind:class="{ 'snap-state': snapping }"
    v-hammer:tap="snap">
    <slot>{{ msg }}</slot>
  </div>
</template>

<script src="../script/Combo.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
