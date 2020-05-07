<template>
  <div class="sh-combo"
    :variant="variant">
    <button ref="trigger"></button>
    <ul ref="options" class="combo-options">
      <slot></slot>
    </ul>
  </div>
</template>

<script src="../script/Combo.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
