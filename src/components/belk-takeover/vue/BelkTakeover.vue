<template>
  <div class="belk-takeover"
    :variant="variant">
    <slot></slot>
    <div class="actual" ref="popperLeft"><slot name="left"></slot></div>
    <div class="actual" ref="popperRight"><slot name="right"></slot></div>
  </div>
</template>

<script src="../script/BelkTakeover.js"></script>
<style lang="scss" src="../style/default.scss"></style>