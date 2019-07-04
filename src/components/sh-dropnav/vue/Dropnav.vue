<template>
  <div class="sh-dropnav" v-bind:class="{ 'is-open': isOpen }">
    <div class="html-items" hidden><slot></slot></div>
    <button ref="button" v-on:click="toggleOpen">{{ activeItem }}</button>
    <div class="item-container">
      <sh-link-list ref="list"></sh-link-list>
    </div>
  </div>
</template>

<script src="../script/Dropnav.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
