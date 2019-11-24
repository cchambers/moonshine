<template>
  <header class="lib-header">
    <div class="contain relative">
      <div class="logo gradient-text">
        <slot></slot>
      </div>
      <div v-html="pageName" class="page-name" v-bind:class="{ active: pageNameActive }"></div>
    </div>
  </header>
</template>

<script src="../script/LibHeader.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
