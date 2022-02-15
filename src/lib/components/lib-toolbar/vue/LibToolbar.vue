<template>
  <div class="lib-toolbar"
    v-bind:class="{ active: active, fullscreen: fullscreen }">
        <div class="control-wrap">
      <div class="control">
        <template v-if="isActive">
          <sh-button
          variant="primary"
          size="sm"
          v-hammer:tap="copyEditor"
          v-on:keyup.enter="copyEditor">
            <i class="material-icons px20 highlight-primary">file_copy</i>
          </sh-button>
        </template>
        <sh-button
          variant="primary"
          size="sm"
          v-hammer:tap="toggleFullscreen"
          v-on:keyup.enter="toggleFullscreen">
          <i class="material-icons px20 highlight-primary">fullscreen</i>
        </sh-button>
        <sh-button
          variant="primary"
          size="sm"
          v-hammer:tap="toggleActive"
          v-on:keyup.enter="toggleActive">
          <i class="material-icons px20 highlight-primary">code</i>
        </sh-button>
      </div>
    </div>
    <div ref="component" class="component" v-html="html"></div>
    <div class="editor" ref="editor"></div>
  </div>
</template>

<script src="../script/LibToolbar.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss">
.ace_text-input {
  position: absolute !important;
}
</style>
