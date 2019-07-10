<template>
  <button :class="{ active: active }"
    :close-trigger="closeTrigger"
    v-hammer:tap="tapHandler"
    class="sh-button">
    <slot name="before-text"></slot>
    <slot></slot>
    <slot name="after-text"></slot>
  </button>
</template>

<script src="../script/Button.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss" scoped></style>
<style lang="scss" src="../style/secondary.scss" scoped></style>
<style lang="scss" src="../style/tertiary.scss" scoped></style>
