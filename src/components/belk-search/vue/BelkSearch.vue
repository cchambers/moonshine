<template>
  <div class="belk-search" 
    :count="count"
    v-bind:class="{ active: isActive }" >

    <!-- Input -->
    <div class="search-input">
      <input ref="input"
              type="text"
              v-on:keydown.enter="doSearch"
              :placeholder="placeholder" 
              @focus="isActive = true" 
              @blur="isActive = false"
              v-on:keyup="keyupHandler">
      <button ref="clear" v-hammer:tap="clearSearch"><i class="material-icons-round">close</i></button>
      <button ref="search" v-hammer:tap="doSearch"><i class="material-icons-round">search</i></button>
    </div> 

    <!-- Close Input -->
    <sh-button ref="cancel" class="cancel-trigger">Cancel</sh-button>

    <div class="search-results">
      <div ref="recent">
        <ul>
          <li v-for="item in suggestions" v-bind:key="item.id">
            {{ item.q}}
          </li>
        </ul>
      </div>
      
      <div ref="actual">
        <ul>
          <li v-for="item in products" v-bind:key="item.id">
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script src="../script/BelkSearch.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
