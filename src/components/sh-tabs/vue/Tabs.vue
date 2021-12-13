<template>
  <div class="sh-tabs" :style="{ width: width }" :changed="hasChanged">
    <div class="tabs-actual" ref="tabs">
      <slot></slot>
    </div>
    <div class="tabs-combo">
      <component
        ref="combo"
        native
        v-bind:is="combo"
        v-bind:id="'tc-'+uuid"
        v-bind:target="target"
        v-bind:comboOptions="comboOptions"
        v-bind:defaultText="defaultComboText"
        variant="primary"
      ></component>
    </div>
  </div>
</template>

<script src="../script/Tabs.js"></script>
<style lang="scss" src="../style/default.scss"></style>
