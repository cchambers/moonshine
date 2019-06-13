<template>
  <header>
    <div class="contain flex start">
      <div class="toggle-nav" v-on:click="toggleNav">
        <i class="material-icons nav-icon">menu</i>
      </div>
      <div class="logo">
        <slot></slot>
      </div>
    </div>
  </header>
</template>
  
<script src="../script/Header.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>