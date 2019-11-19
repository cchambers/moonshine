<template>
  <header class="lib-header">
    <div class="contain relative flex start pad-x">
      <div v-if="nav" class="toggle-nav" v-hammer:tap="toggleNav">
        <i class="material-icons nav-icon">menu</i>
      </div>
      <div class="logo">
        <slot name="default"></slot>
      </div>
      <div v-html="pageName" class="page-name" v-bind:class="{ active: pageNameActive }"></div>
    </div>
  </header>
</template>

<script src="../script/LibHeader.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
