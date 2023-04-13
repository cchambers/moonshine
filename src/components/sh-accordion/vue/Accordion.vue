<template>
  <div class="sh-accordion"
    :id="uniqueId"
    :variant="variant"
    v-bind:class="{ 'active': ariaExpanded }">
    <button v-if="variant != 'none'" ref="button"
      class="header"
      :id="headerId"
      :aria-controls="ariaControlsId"
      @click="toggleActive">
      <slot name="header"></slot>
      <i v-if="variant"
        :class="`material-icons-round ${iconColor} ${iconSize}`">
        {{ iconHandler }}
      </i>
    </button>
    <div :aria-expanded="ariaExpanded" :aria-labelled-by="headerId" role="region">
      <div :id="ariaControlsId" class="accordion-collapse">
        <div class="body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../script/Accordion.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
<style lang="scss" src="../style/tertiary.scss"></style>
