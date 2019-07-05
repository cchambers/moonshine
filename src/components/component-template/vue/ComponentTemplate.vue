<template>
  <div class="component-template"
   :variant="variant"
   v-bind:class="{ 'snap-state': snapping }"
   v-hammer:tap="snap">
    <slot>{{ msg }}</slot>
  </div>
</template>

<script src="../script/ComponentTemplate.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
