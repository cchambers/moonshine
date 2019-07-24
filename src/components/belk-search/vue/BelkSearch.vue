<template>
  <div class="belk-search">

    <!-- Sarch Wrapper -->
    <div class="search-wrapper">

      <!-- Input -->
      <div class="search-input">
        <input :placeholder="placeholder" type="text">
        <div class="input-actions">
          <button ref="clear">Clear</button>
          <button ref="search">Search</button>
        </div>
      </div>  
      <!-- Close Input -->
      <button ref="cancel">Cancel</button>
    </div>
    <!-- Search Trigger -->
    <button>Search <i></i></button>

    <sh-popper refs="results" id="results">
      <div ref="recent">
        HERE BE THE RECENTS.
      </div>
      <div ref="actual">
        HERE BE THE RESULTS.
      </div>
    </sh-popper>
  </div>
</template>

<script src="../script/BelkSearch.js"></script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
