<template>
  <button :close-trigger="closeTrigger" class="sh-button">
    <slot name="before-text"></slot>
    <slot></slot>
    <slot name="after-text"></slot>
  </button>
</template>

<script src="../script/Button.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
<style lang="scss">
sh-button {
  display: inline-block;
}
</style>
