<template>
  <button v-on:click="count++" class="button-counter">
    <slot name="precontent">{{ pre }}</slot>
    {{ count }}
    <slot name="postcontent">{{ post }}</slot>
  </button>
</template>

<script src="../script/Button.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
