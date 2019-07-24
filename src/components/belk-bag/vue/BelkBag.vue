<template>
  <div class="belk-bag" :variant="variant">
    <div class="bag-icon">{{ itemCount }}</div>
    <div class="bag-total">{{ priceFormatted }}</div>
  </div>
</template>

<script src="../script/BelkBag.js"></script>
<style lang="scss" src="../style/default.scss"></style>
