<template>
  <div class="sh-modal" role="dialog" 
    :variant="variant" 
    :class="{ active: active }" 
    :reveal="reveal"
    :id="uniqueId" 
    :aria-labelledby="ariaID" 
    :aria-describedby="ariaDescID">
    <div class="content">
      <div class="tab-lock" v-on:focus="focusLast()" tabindex="0"></div>
      <div class="header">
        <h3 :id="ariaHeaderID">
          <slot name="header">{{ header }}</slot>
        </h3>
        <div close-trigger v-hammer:tap="close">
          <belk-icon name="close" width="30"></belk-icon>
        </div>
      </div>
      <div class="body" ref="body" :id="ariaDescID">
        <div v-if="contentUrl && !loaded" class="loading-anim" v-html="loadHtml"></div>
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="footer">{{ footer }}</slot>
      </div>
      <div class="tab-lock" v-on:focus="focusFirst()" tabindex="0"></div>
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
  z-index: 90;
  opacity: 0;
  background: rgba(255, 255, 255, 0.9);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  will-change: scroll-position;
  &[overlay] {
    &[overlay="none"] {
      background: transparent;
    }
    /* Generate background colors for every bg */
    @each $name, $hex in $colors {
      &[overlay="#{$name}"] {
        @include background-opacity($hex, 0.9);
      }
    }
  }

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