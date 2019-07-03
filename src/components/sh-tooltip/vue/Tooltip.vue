<template>
  <div class="sh-tooltip" v-bind:class="{ 'snap-state': snapping }" v-on:click="snap">
    <slot>{{ msg }}</slot>
  </div>
</template>

<script src="../script/Tooltip.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
<style lang="scss" src="../style/primary.scss" scoped></style>
