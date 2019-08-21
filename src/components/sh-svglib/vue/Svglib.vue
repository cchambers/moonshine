<template>
  <div class="sh-svglib">
    <svg>
      <defs>
        <g v-for="(data, name) in icons" v-bind:key="name" v-html="data.svg" :id="name"></g>
      </defs>
    </svg>
  </div>
</template>

<script src="../script/Svglib.js"></script>
<style lang="scss" src="../style/default.scss"></style>
