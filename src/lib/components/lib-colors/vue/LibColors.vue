<template>
  <div class="lib-colors">
    <ul class="no-pad">
      <li v-for="color in colors" v-bind:key="color" class="flex list">
        <div class="back" :class="'back-'+color"></div>
        <div class="name">{{color}}</div>
        <div class="text wt-bold" :class="color">
          Lorem ipsum doler...
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ComponentPrototype from '../../../../components/component-prototype';

export default {
  mixins: [ComponentPrototype],
  name: 'LibColors',
  data() {
    return {
      colors: [
        'brand-black',
        'brand-darkblue',
        'brand-blue',
        'brand-teal',
        'brand-green',
        'brand-lime',
        'brand-yellow',
        'brand-orange',
        'brand-red',
        'brand-pink',
        'brand-purple',
        'seasonal-primary',
        'seasonal-secondary',
        'seasonal-tertiary',
        'brand-wildfuscia',
        'highlight-primary',
        'highlight-secondary',
        'highlight-tertiary',
        'highlight-quaternary',
        'highlight-quinary',
        'lowlight-primary',
        'lowlight-secondary',
        'lowlight-tertiary',
        'lowlight-quaternary',
        'lowlight-quinary',
        'accent-primary',
        'accent-secondary',
        'accent-tertiary',
        'accent-quaternary',
        'accent-quinary',
      ],
    };
  },
};
</script>
<style lang="scss">
  lib-colors {
    display: block;
    .list {
      justify-content: flex-start;
      padding: $micro;
      > div {
        margin-right: $micro
      }
    }
    .back {
      height: $rem;
      width: $rem;
      border-radius: 50%;
    }
    .name {
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 20rem;
    }
  }
</style>
