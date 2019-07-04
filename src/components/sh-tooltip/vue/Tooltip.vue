<template>
  <div class="sh-tooltip" >
    <div class="tip"><slot name="tip">{{ tip }}</slot></div>
    <slot></slot>
  </div>
</template>

<script src="../script/Tooltip.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
<style lang="scss" src="../style/primary.scss" scoped></style>
