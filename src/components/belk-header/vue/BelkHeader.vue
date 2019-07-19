<template>
  <div class="belk-header">
    <div ref="pre" class="pre">
      <slot name="pre-header"></slot>
    </div>
    <div ref="primary" class="primary">
      <belk-logo class="logo" width="100"></belk-logo>
    </div>
    <div ref="secondary" class="secondary">
      <belk-logo class="logo" width="80" color="highlight-primary"></belk-logo>
    </div>
    <div ref="tertiary" class="tertiary">
      <slot name="tertiary-nav"></slot>
    </div>
    <div ref="post" class="post">
      <slot name="post-header"></slot>
    </div>
  </div>
</template>

<script src="../script/BelkHeader.js"></script>
<style lang="scss" src="../style/default.scss"></style>