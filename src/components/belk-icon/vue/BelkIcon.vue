<template>
  <div class="belk-icon" :variant="variant">
    <svg :height="height" :width="width">
      <use :xlink:href="iconID" />
    </svg>
  </div>
</template>

<script src="../script/BelkIcon.js"></script>
<style lang="scss" src="../style/default.scss"></style>
