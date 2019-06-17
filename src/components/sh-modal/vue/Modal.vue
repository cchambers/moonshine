<template>
  <div class="sh-modal">
    <slot></slot>
  </div>
</template>
  
<script src="../script/Modal.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
<style lang="scss">
  [modal-trigger] {
    color: #3c7cff;
  }

  #modals {
    position: fixed;
    pointer-events: none;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    opacity: 0;
    background: rgba(255, 255, 255, 0.9);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    will-change: scroll-position;
  }
  #modals > .modal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transform: translateX(-130%);
    transition: transform 300ms $ease;
    transition-delay: 50ms;
    height: 0;
    overflow: hidden;
  }
</style>