<template> 
  <div class="sh-curtain" v-bind:class="{ 'active': active }" v-hammer:tap="hide"></div>
</template>

<script src="../script/Curtain.js"></script>
<style lang="scss" src="../style/default.scss"></style>