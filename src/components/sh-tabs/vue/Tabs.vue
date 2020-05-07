<template>
  <div>
    <div class="sh-tabs">
      <div class="tabs-actual">
        <slot></slot>
      </div>
      <div class="tabs-combo">
        <sh-combo></sh-combo>
      </div>
    </div>
  </div>
</template>

<script src="../script/Tabs.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
