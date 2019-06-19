<template>
  <div class="lib-toolbar" v-bind:class="{ active: active }">
    <div class="control-wrap">
      <div class="control">
        <sh-button class="min" v-if="!active" v-on:click.native="active = true">show code</sh-button>
        <!-- <sh-button class="min" v-if="active">copy code</sh-button> -->
        <sh-button class="min" v-if="active" v-on:click.native="active = false">hide code</sh-button>
      </div>
      <div ref="component" class="component">
        <div ref="uuid"></div>
      </div>
    </div>
    <div class="editor" ref="editor"></div>
  </div>
</template>

<script src="../script/LibToolbar.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
