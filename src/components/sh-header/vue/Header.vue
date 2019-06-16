<template>
  <header class="sh-header">
    <div class="contain flex start">
      <div v-if="nav" class="toggle-nav" v-on:click="toggleNav">
        <i class="material-icons nav-icon">menu</i>
      </div>
      <div class="logo">
        <slot></slot>
      </div>
      <div v-html="pageName" class="page-name" v-bind:class="{ active: pageNameActive }"></div>
    </div>
  </header>
</template>
  
<script src="../script/Header.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>