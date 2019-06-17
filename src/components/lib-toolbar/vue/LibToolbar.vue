<template>
  <div class="lib-toolbar">
    <div ref="component" class="component">
      <slot></slot>
    </div>
    <div class="codeview">
    <pre>
      <code class="language-html">
        {{ code }}
      </code>
    </pre>
    </div>
  </div>
</template>

<script src="../script/LibToolbar.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
