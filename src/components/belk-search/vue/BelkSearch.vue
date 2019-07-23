<template>
  <div class="belk-search">
    <input :placeholder="placeholder" type="text">
    <button ref="clear">Clear</button>
    <button ref="search">Search</button>
    <button ref="cancel">Cancel</button>
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
