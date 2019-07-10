<template>
  <span class="flex">
    <span class="sh-rating"
      :icon="maticon"
      :count="count"
      :variant="variant"
      :level="level">
    </span>
    <span v-if="ratecount > 0" class="sh-rating-count">({{ ratecount }})</span>
  </span>
</template>

<script src="../script/Rating.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
