<template>
  <div class="sh-link-list">
    <div hidden><slot></slot></div>
    <ul>
      <li v-for="(item, index) in items" v-bind:key="item.key">
        <a v-if="!item.hidden"
        v-bind:class="{ 'active': item.active }"
        :data-key="index"
        :href="item.link"
        v-on:click="clickHandler">{{ item.text }} </a>
      </li>
    </ul>
  </div>
</template>

<script src="../script/LinkList.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
