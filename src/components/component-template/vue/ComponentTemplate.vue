<template>
  <div class="component-template" v-bind:class="{ 'snap-state': snapping }" v-on:click="snap">
    <slot>{{ msg }}</slot>
  </div>
</template>

<script src="../script/ComponentTemplate.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
<style lang="scss" src="../style/primary.scss" scoped></style>
