<template>
  <div class="sh-banner"
    :class="{ 'closed': closed }"
    :variant="variant"
    :hidden="!revealed">
    <div class="banner-background"
      :class="background"
      :animate="animate" ref="content">
      <slot></slot>
    </div>
    <div v-if="isClosable" class="banner-closable">
      <sh-button @click="closeBanner">
        <belk-icon height="20" width="20" name="close">Close Banner</belk-icon>
      </sh-button>
    </div>
  </div>
</template>

<script src="../script/Banner.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
