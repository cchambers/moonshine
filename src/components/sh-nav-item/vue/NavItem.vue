<template>
  <div class="sh-nav-item" 
    v-bind:class="{ 'touch': mobile }"
    :active="active">
    <div class="popper-target" ref="target">
      <div class="reference">
        <slot name="reference"></slot>
      </div>
      <button v-hammer:tap="activate">
        <i class="material-icons-round">add</i>
      </button>
    </div>
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
  </div>
</template>

<script src="../script/NavItem.js"></script>
<style lang="scss" src="../style/default.scss"></style>