<template>
  <div class="sh-combo"
    :variant="variant"
    :class="{
      active: isActive,
      native: native,
    }">
    <div class="combo-actual">
      <button class="combo-trigger" ref="trigger"
        v-hammer:tap="buttonHandler"
        v-on:keydown.down="highlightHandler"
        v-on:keydown.up="highlightHandler"
        v-on:keydown.enter="enterHandler">
        <div class="combo-text">
          {{ activeText }}
        </div>
        <belk-icon name="arrow-down"></belk-icon>
      </button>
      <div class="combo-hidden-options" hidden>
        <slot name="options"></slot>
      </div>
      <div ref="options" class="combo-options" v-hammer:tap="optionClickHandler">
        <ul>
          <li v-for="item in options"
          v-bind:key="item.index"
          v-bind:value="item.value"
          v-bind:class="{ active: item.active, highlight: item.highlight }">
            {{ item.text }}
          </li>
        </ul>
      </div>
    </div>
    <div class="combo-select" ref="select">
      <select v-on:change="selectHandler">
        <option value="blank_opt" disabled selected>{{ defaultText }}</option>
        <option v-for="item in options"
        v-bind:key="item.index"
        v-bind:value="item.value"
        v-bind:selected="item.active">
          {{ item.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script src="../script/Combo.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
