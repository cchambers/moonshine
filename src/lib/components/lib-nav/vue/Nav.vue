<template>
  <div>
    <div class="show-nav nav-icon" v-hammer:tap="toggleNav">
      <i class="material-icons-round" :class="{ active: !navShown }">menu</i>
      <i class="material-icons-round" :class="{ active: navShown }">arrow_back</i>
    </div>
    <div class="lib-nav">
      <nav>
        <div class="primary" ref="primary">
          <!-- <div v-hammer:tap="closeNav" class="go-back">
          </div> -->
          <div id="nav-search">
            <input v-model="search"
            @keyup="doSearch"
            type="text"
            ref="search"
            placeholder="Search">
          </div>
          <ul>
            <li v-for="(item, key) in items" v-bind:key="item.id">
              <div class="header">{{key}}</div>
              <ul>
                <li v-for="(component, element) in item" v-bind:key="component.id">
                  <a :href="'/components/' + element">{{ component.name }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script src="../script/Nav.js"></script>
<style lang="scss" src="../style/default.scss"></style>

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
