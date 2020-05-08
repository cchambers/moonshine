<template>
  <div class="sh-combo"
    :variant="variant"
    :class="{
      active: isActive
    }">
    <button class="combo-trigger" ref="trigger" v-hammer:tap="buttonHandler">
      <div class="combo-text">
        {{ activeText }}
      </div>
      <belk-icon name="arrow-down"></belk-icon>
    </button>
    <div class="combo-hidden-options" hidden>
      <slot name="options"></slot>
    </div>
    <div ref="options" class="combo-options" v-hammer:tap="optionHandler">
      ...
    </div>
  </div>
</template>

<script src="../script/Combo.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
