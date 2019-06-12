<template>
  <div class="demo-toolbar">
    <div ref="component" class="component">
      <slot></slot>
    </div>
    <div class="codeview">
      <textarea cols="30" rows="10" v-model="code"></textarea>
    </div>
  </div>
</template>

<script src="../script/DemoToolbar.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
