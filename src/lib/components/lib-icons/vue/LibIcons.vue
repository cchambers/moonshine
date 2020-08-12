<template>
  <div class="lib-icons">
    <div v-for="icon in icons" v-bind:key="icon.index">
      <h3>{{ icon }}</h3>
      <div class="flex start">
        <belk-icon :name="icon"></belk-icon>
        <belk-icon :name="icon" class="accent-secondary"></belk-icon>
        <belk-icon :name="icon" class="accent-tertiary"></belk-icon>
        <belk-icon :name="icon" class="accent-quaternary"></belk-icon>
        <belk-icon :name="icon" class="accent-quinary"></belk-icon>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  name: 'LibIcons',

  data() {
    return {
      icons: ['close',
        'menu',
        'search',
        'coupon',
        'person',
        'map-pin',
        'bag',
        'clipboard',
        'checkmark',
        'arrow-down'],
    };
  },

  mounted() {
    return true;
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
