<template>
  <div class="belk-search">


    <!-- Input -->
    <div class="search-input">
      <input :placeholder="placeholder" type="text" @focus="magic_flag = true" @blur="magic_flag = false">
      <button ref="clear"><i class="material-icons-round">close</i></button>
      <button ref="search"><i class="material-icons-round">search</i></button>
    </div> 

    <!-- Close Input -->
    <button ref="cancel" class="close-search">Cancel</button>

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
