<template>
  <div class="sh-tooltip"
    :class="{ active: active }"
    @mouseover="ariaHidden = false"
    @mouseleave="ariaHidden = true">
    <div class="tip" :id="tipId" role="tooltip" :aria-hidden="ariaHidden">
      <slot name="tip">{{ tip }}</slot>
      <div v-html="tipData"></div>
    </div>
    <span :aria-describedby="tipId">
      <slot></slot>
    </span>
  </div>
</template>

<script src="../script/Tooltip.js"></script>
<style lang="scss" src="../style/default.scss"></style>
