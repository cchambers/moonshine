<template>
  <div class="belk-search" 
    :count="count"
    v-bind:class="{ active: isActive }">

    <!-- Input -->
    <div class="search-input">
      <input ref="input"
        type="text"
        v-on:keyup="keyupHandler"
        v-on:keyup.enter="doSearch"
        :placeholder="placeholder" 
        @focus="isActive = true" 
        @blur="isActive = false">
      <button v-if="valueLength>0" ref="clear" v-hammer:tap="clearSearch"><i class="material-icons-round">close</i></button>
      <button ref="search" v-hammer:tap="doSearch"><i class="material-icons-round">search</i></button>
    </div> 

    <!-- Close Input -->
    <sh-button ref="cancel" class="cancel-trigger">Cancel</sh-button>

    <div class="search-results">
      <div v-if="count==0 && valueLength>2 && isActive && noResults" class="search-noresults">
        <p class="italic px14">
          No suggestions found for "{{ searchValue }}"...
        </p>
      </div>

      <div ref="recent" v-if="recentCount>0 && count==0" class="search-recent">
        <div class="flex space-between">
          <div class="bold">
            Recent Searches
          </div>
          <div>
            <sh-button v-hammer:tap="clearRecentSearches">Clear History</sh-button>
          </div>
        </div>
        <ul>
          <li v-for="item in recents" v-bind:key="item.id">
            {{ item }}
          </li>
        </ul>
      </div>
      
      <div ref="actual" v-if="count>0" class="search-suggestions">
        <div class="keywords">
          <ul>
            <li v-for="item in suggestions" v-bind:key="item.id"
              @mouseover="suggestionHoverHandler(item.q)">
              {{ item.q }}
            </li>
          </ul>
        </div>

        <div ref="products" class="products">
          <ul>
            <li v-for="item in products" v-bind:key="item.id">
              {{ item.title }}
            </li>
          </ul>
        </div>

      </div>

    </div>
  </div>
</template>

<script src="../script/BelkSearch.js"></script>
<style lang="scss" src="../style/default.scss"></style>
