<template>
  <div class="sh-input">
    <div hidden ref="default-value"><slot></slot></div>
    <label :for="inputId"><slot name="label">{{ label }}</slot></label>
    <input :id="inputId" class="actual" type="text" v-model="value" />
  </div>
</template>

<script src="../script/Input.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
