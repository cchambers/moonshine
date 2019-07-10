<template>
  <span :id="id" class="sh-adapt-content"
    :variant="variant">
    <span hidden><slot></slot></span>
    <span class="sm-only"><slot name="sm">{{ sm }}</slot></span>
    <span class="md-only"><slot name="md">{{ md }}</slot></span>
    <span class="lg-only"><slot name="lg">{{ lg }}</slot></span>
    <span class="xl-only"><slot name="xl">{{ xl }}</slot></span>
  </span>
</template>

<script src="../script/AdaptContent.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
