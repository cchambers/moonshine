<template>
  <div class="sh-svglib">
    <svg>
      <defs>
        <g v-for="(html, name) in icons" v-bind:key="name" v-html="html" :id="name"></g>
      </defs>
    </svg>
  </div>
</template>

<script src="../script/Svglib.js"></script>
<style lang="scss" src="../style/default.scss"></style>
