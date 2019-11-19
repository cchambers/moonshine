<template>
  <div class="lib-toolbar"
    v-bind:class="{ active: active, fullscreen: fullscreen }">
    <div ref="component" class="component" v-html="html"></div>
    <div class="control-wrap">
      <div class="control">
        <template v-if="isActive">
          <sh-button round
          variant="tertiary"
          scale="60"
          v-hammer:tap="copyEditor"
          v-on:keyup.enter="copyEditor">
            <i class="material-icons px20">file_copy</i>
          </sh-button>
        </template>
        <sh-button round
          variant="secondary"
          scale="60"
          v-hammer:tap="toggleFullscreen"
          v-on:keyup.enter="toggleFullscreen">
          <i class="material-icons px20">fullscreen</i>
        </sh-button>
        <sh-button round
          variant="primary"
          scale="60"
          v-hammer:tap="toggleActive"
          v-on:keyup.enter="toggleActive">
          <i class="material-icons px20">code</i>
        </sh-button>
      </div>
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
</style>
