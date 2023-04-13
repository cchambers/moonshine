<template>
  <div class="belk-badge"
    :variant="variant">
    <div class="icon"
    :class="[classes]">{{ content.icon }}</div>
    <div class="text">
      <slot>{{ content.text }}</slot>
    </div>
  </div>
</template>

<script>
import ComponentPrototype from '../../component-prototype';

export default {
  mixins: [ComponentPrototype],

  name: 'BelkBadge',

  props: {
    iconName: {
      type: String,
    },
    iconColor: {
      type: String,
    },
    fill: {
      type: Boolean,
      default: false,
    },
    which: {
      type: String,
    },
  },
  data() {
    return {
      content: {
        text: '',
      },
      filled: this.fill,
      color: 'lowlight-primary',
      types: {
        superbuy: {
          icon: 'diamond',
          color: 'brand-blue',
          text: 'Super Buy',
        },
        new: {
          icon: 'celebration',
          color: 'brand-red',
          text: 'New',
        },
        toprated: {
          icon: 'star',
          color: 'yellow',
          filled: true,
          text: 'Top Rated',
        },
        pickuponly: {
          icon: 'local_shipping',
          color: 'brand-pink',
          text: 'Pickup Only',
        },
        collection: {
          icon: 'sunny',
          color: 'brand-yellow',
          filled: true,
          text: 'Collection',
        },
        doorbuster: {
          icon: 'local_fire_department',
          color: 'brand-red',
          text: 'Doorbuster',
        },
        specialoffer: {
          icon: 'deployed-code',
          color: 'brand-blue',
          text: 'Special Offer',
        },
        onlineexclusive: {
          icon: 'devices',
          color: 'brand-purple',
          text: 'Online Exclusives',
        },
        dailydeals: {
          icon: 'person_celebrate',
          color: 'brand-blue',
          text: 'Daily Deals',
        },
        bestseller: {
          icon: 'shopping-bag',
          color: 'brand-pink',
          text: 'Best Seller',
        },
      },
    };
  },
  computed: {
    classes() {
      const arr = [];
      if (this.content.color) arr.push(this.content.color);
      if (this.content.filled) arr.push('filled');
      return arr;
    },
  },
  created() {
    if (this.which) {
      const data = this.types[this.which];
      if (data) this.content = { ...data };
    } else {
      if (this.iconName) this.content.icon = this.iconName;
      if (this.iconColor) this.content.color = this.iconColor;
    }
  },
};
</script>
<style lang="scss" src="../style/default.scss"></style>
<style lang="scss" src="../style/primary.scss"></style>
