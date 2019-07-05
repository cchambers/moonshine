<template>
  <div class="sh-input">
    <label :for="inputId"></label>
    <input :id="inputId" class="actual" type="text" v-model="value" />
  </div>
</template>

<script src="../script/Input.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
