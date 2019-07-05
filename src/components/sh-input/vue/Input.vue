<template>
  <div class="sh-input"
   :variant="variant">
   <label :for="uniqueId"></label>
   <input :id="uniqueId" class="actual" type="text" v-model="value">
  </div>
</template>

<script src="../script/Input.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
