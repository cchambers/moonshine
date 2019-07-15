<template>
  <div class="sh-modal" role="dialog" 
    :variant="variant" 
    :class="{ active: active }" 
    :reveal="reveal"
    :id="uniqueId" 
    :aria-labelledby="ariaID" 
    :aria-describedby="ariaDescID">
    <div class="content">
      <div class="tab-lock" tabindex="0"></div>
      <div class="header">
        <h3 :id="ariaHeaderID">
          <slot name="header">{{ header }}</slot>
        </h3>
        <div>
          <i v-hammer:tap="close" class="material-icons">close</i>
        </div>
      </div>
      <div class="body" ref="body" :id="ariaDescID">
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="footer">{{ footer }}</slot>
      </div>
      <div class="tab-lock" tabindex="0"></div>
    </div>
  </div>
</template>
  
<script src="../script/Modal.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
<style lang="scss" src="../style/secondary.scss"></style>
<style lang="scss">
a[modal-trigger] {
  color: $accent-primary;
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