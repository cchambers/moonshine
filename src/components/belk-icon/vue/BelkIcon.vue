<template>
  <div class="belk-icon" :variant="variant">
    <div ref="title" hidden><slot></slot></div>
    <svg :height="height" :width="width">
      <title v-if="title">{{ title }}</title>
      <use :xlink:href="iconID" />
    </svg>
  </div>
</template>

<script src="../script/BelkIcon.js"></script>
<style lang="scss" src="../style/default.scss"></style>
