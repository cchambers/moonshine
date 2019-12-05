<template>
  <div class="lib-reqs">
    <div v-for="(item, value) in items" v-bind:key="item.key">
      <h4>{{ value }}</h4>
      <ul>
        <li v-for="req in item" v-bind:key="req.key">
          {{ req }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="../script/LibReqs.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
