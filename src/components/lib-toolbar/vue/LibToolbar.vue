<template>
  <div class="lib-toolbar" v-bind:class="{ active: active, fullscreen: fullscreen }">
    <div ref="component" class="component" v-html="html"></div>
    <div class="control-wrap">
      <div class="control">
        <!-- <div v-if="isActive">
          <sh-button class="min" v-hammer:tap="copyEditor">
            <i class="material-icons px20">file_copy</i>
          </sh-button>
        </div> -->
        <sh-button class="min" v-hammer:tap="toggleFullscreen">
          <i class="material-icons px20">fullscreen</i>
        </sh-button>
        <sh-button class="min" v-hammer:tap="toggleActive">toggle code</sh-button>
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

.control {
  button {
    background: $lowlight-tertiary;
    font-size: 8px;
    &:hover {
      background: $accent-secondary;
    }
  }
}
</style>