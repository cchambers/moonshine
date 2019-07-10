<template>
  <span class="flex">
    <span class="sh-rating"
      :show="show"
      :icon="maticon"
      :count="count"
      :variant="variant"
      :level="level"
      :chosen="chosen">
      <ul v-if="choose" class="choose" v-on:mouseleave="show = 0">
        <li><button v-on:mouseover="hoverHandler" v-hammer:tap="rateHandler" aria-label="rate 1 of 5 stars" value="1"></button></li>
        <li><button v-on:mouseover="hoverHandler" v-hammer:tap="rateHandler" aria-label="rate 2 of 5 stars" value="2"></button></li>
        <li><button v-on:mouseover="hoverHandler" v-hammer:tap="rateHandler" aria-label="rate 3 of 5 stars" value="3"></button></li>
        <li><button v-on:mouseover="hoverHandler" v-hammer:tap="rateHandler" aria-label="rate 4 of 5 stars" value="4"></button></li>
        <li><button v-on:mouseover="hoverHandler" v-hammer:tap="rateHandler" aria-label="rate 5 of 5 stars" value="5"></button></li>
      </ul>
    </span>
    <span v-if="ratecount > 0" class="sh-rating-count">({{ ratecount }})</span>
  </span>
</template>

<script src="../script/Rating.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
