<template>
  <div class="sh-popper">
    <div class="popper-target reference" ref="target">
      <slot name="reference"></slot>
    </div>
    <transition
    :name="transition"
    @after-leave="doDestroy">
      <div
        class="popper-actual"
        :fill="fill"
        ref="popper"
        v-show="!disabled && showPopper">
        <div class="popper-content">
          <slot name="content">{{ content }}</slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script src="../script/Popper.js"></script>
<style lang="scss" src="../style/default.scss"></style>
