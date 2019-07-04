<template>
  <div class="lib-toolbar" v-bind:class="{ active: active }">
    <div class="control-wrap">
      <div class="control">
        <sh-button class="min" v-hammer:tap="toggleActive">
          <span v-if="active">hide code</span>
          <span v-else>show code</span>
        </sh-button>

        <sh-button class="min" v-hammer:tap="copyEditor">
          <i class="material-icons px20">file_copy</i>
        </sh-button>

        <sh-button class="min" v-hammer:tap="fullscreen">
          <i class="material-icons px20">fullscreen</i>
        </sh-button>
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