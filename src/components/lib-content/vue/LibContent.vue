<template>
  <div>
    <div v-if="pageData.name">
      <h1>{{ pageData.name }}</h1>
    </div>
    <div v-else class="contain pad-y white">
      <h2>Vue template components are...</h2>
      <ul>
        <li>reusable</li>
        <li>bundled</li>
        <li>data-reactive</li>
        <li>scoped</li>
      </ul>

      <h2>Shine is...</h2>
      <ul>
        <li>localized component development and deployment</li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script src="../script/LibContent.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>
