<template>
  <nav>
    <div class="primary">
      <div v-on:click="closeNav" class="go-back">
        <i class="material-icons nav-icon">arrow_back</i>
      </div>
      <slot name="primary"></slot>
    </div>
    <slot name="secondary"></slot>
  </nav>
</template>
  
<script src="../script/Nav.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>