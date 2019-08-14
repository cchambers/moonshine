<template>
  <div class="belk-search" :count="count" v-bind:class="{ active: isFocused }">
    <!-- Input -->
    <div class="search-input">
      <input
        ref="input"
        type="text"
        v-on:keyup="keyupHandler"
        v-on:keyup.enter="doSearch"
        :placeholder="placeholder"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <button v-if="valueLength>0" ref="clear" v-hammer:tap="clearSearch">
        <i class="material-icons-round">close</i>
      </button>
      <button ref="search" v-hammer:tap="doSearch">
        <i class="material-icons-round">search</i>
      </button>
    </div>

    <div class="search-results">
      <div
        v-if="count==0 && valueLength>2 && isFocused && noResults && searchValue!=''"
        class="search-noresults"
      >
        <p class="italic px14">No suggestions found for "{{ searchValue }}"...</p>
      </div>

      <div ref="recent" v-if="recentCount>0 && count==0" class="search-recent">
        <div class="flex space-between">
          <div class="bold">Recent Searches</div>
          <div>
            <sh-button v-hammer:tap="clearRecentSearches">Clear History</sh-button>
          </div>
        </div>
        <ul>
          <li v-for="item in recents" v-bind:key="item.id">{{ item }}</li>
        </ul>
      </div>

      <div ref="actual" v-bind:class="{ 'active': count>0 }" class="search-suggestions">
        <div class="keywords">
          <ul>
            <li
              v-for="item in suggestions"
              v-bind:key="item.id"
              v-hammer:tap="doSearch(item.q)"
              @mouseover="suggestionHoverHandler(item.q)"
            >
              {{ item.q }}
            </li>
          </ul>
        </div>

        <div class="products">
          <component
            ref="suggestedProducts"
            v-bind:is="belkProducts"
            v-bind:product-array="products"
            variant="secondary"
          ></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../script/BelkSearch.js"></script>
<style lang="scss" src="../style/default.scss"></style>
