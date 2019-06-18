<template>
  <article class="sh-modal">
    <div class="content">
      <header>
        <h1>
          <slot name="header">{{ header }}</slot>
        </h1>
      </header>
      <slot name="content"></slot>
      <footer>
        <slot name="footer">{{ footer }}</slot>
      </footer>
    </div>
  </article>
</template>
  
<script src="../script/Modal.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
<style lang="scss">
[modal-trigger] {
  color: #3c7cff;
}

#sh-modals {
  position: fixed;
  pointer-events: none;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  opacity: 0;
  background: rgba(255, 255, 255, 0.9);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  will-change: scroll-position;
}

html {
  &.sh-modal-open {
    > * {
      overflow: hidden !important;
    }
    #close-modal {
      transform: translateZ(0);
    }
    #close-curtain {
      transform: translateY(-10rem) translateZ(0) !important;
    }
    #sh-modals {
      pointer-events: initial;
      opacity: 1;
      .sh-modal.active {
        transform: translateY(0);
        height: auto;
      }
    }
  }
}
</style>