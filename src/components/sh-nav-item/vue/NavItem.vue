<template>
  <div class="sh-nav-item">
    <transition
    :name="transition"
    :enter-active-class="enterActiveClass"
    :leave-active-class="leaveActiveClass"
    @after-leave="doDestroy">
      <div
        class="actual"
        ref="popper"
        v-show="!disabled && showPopper">
        <slot>{{ content }}</slot>
      </div>
    </transition>
    <div ref="target">
      <slot name="reference"></slot>
    </div>
  </div>
</template>

<script src="../script/NavItem.js"></script>
<style lang="scss" src="../style/default.scss"></style>