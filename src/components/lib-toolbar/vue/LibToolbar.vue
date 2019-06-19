<template>
  <div class="lib-toolbar">
    <div ref="component" class="component">
      <div ref="uuid"></div>
    </div>
    <pre>
      <code class="codeview" v-html="code"></code>
    </pre>
  </div>
</template>

<script src="../script/LibToolbar.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
