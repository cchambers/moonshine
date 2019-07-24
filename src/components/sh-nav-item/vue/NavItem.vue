<template>
  <div class="sh-nav-item">
    <Popper ref="pop" boundaries-selector="#main">
      <slot name="flyout"></slot>
      <div slot="reference">
        <slot></slot>
      </div>
    </Popper>
  </div>
</template>

<script src="../script/NavItem.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
