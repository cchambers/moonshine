<template>
  <div class="sh-accordion" v-bind:class="{ 'active': ariaExpanded }" v-on:click="toggleActive">
    <h3 class="header" :id="headerId" :aria-controls="ariaControlsId">
      <slot name="header"></slot>
    </h3>
    <div :aria-expanded="ariaExpanded" :aria-labelled-by="headerId" role="region">
      <div :id="ariaControlsId" class="collapse">
        <div class="body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../script/Accordion.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
<style lang="scss" src="../style/primary.scss" scoped></style>
