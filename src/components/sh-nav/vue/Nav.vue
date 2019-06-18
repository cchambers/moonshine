<template>
  <nav>
    <div id="nav-search">
      <input v-model="search" @keyup="doSearch" type="text" ref="search" placeholder="Looking for something? Just type.">
    </div>
    <div class="primary" ref="primary">
      <div v-on:click="closeNav" class="go-back">
        <i class="material-icons nav-icon">arrow_back</i>
      </div>
      <slot name="primary"></slot>
    </div>
    <div class="secondary" ref="secondary">
      <div id="nav-search-results" ref="results">
        <ul>
          <li v-for="item in filteredResults" v-bind:key="item.id">
            <a :href="item.link" v-html="item.name" :note="item.category"></a>
          </li>
        </ul>
      </div>
      <slot name="secondary"></slot>
    </div>
    <div class="ad-space">
      <slot name="tertiary"></slot>
    </div>
  </nav>
</template>
  
<script src="../script/Nav.js"></script>
<style lang="scss" src="../style/default.scss" scoped></style>

<style lang="scss">
a {
  .search-highlight {
    color: $accent-primary;
  }
  &:hover {
    .search-highlight {
      color: inherit;
    }
  }
}
</style>