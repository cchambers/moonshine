<template>
  <div class="lib-toolbar" v-bind:class="{ active: active }">
    <div class="control-wrap">
      <div class="control">
        <sh-button class="min" toggle active-text="hide code" v-hammer:tap="toggleActive">show code</sh-button>
      </div>
      <div ref="component" class="component" v-html="html"></div>
    </div>
    <div class="editor" ref="editor"></div>
  </div>
</template>

<script src="../script/LibToolbar.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
<style lang="scss">
.ace_text-input {
  position: absolute !important;
}

.control {
  button  {
    background: $lowlight-tertiary;
    font-size: 8px;
  }
}
</style>