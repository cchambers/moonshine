<template>
  <div class="lib-colors">
    <ul class="no-pad">
      <li
        v-for="(color, index) in colors"
        :key="color"
        class="flex list"
        tabindex="0"
      >
        <div
          class="back"
          :class="'back-'+color"
        />
        <div class="name">
          {{ color }}
        </div>
        <div
          class="text wt-bold"
          :class="color"
        >
          {{ lyrics[index] }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ComponentPrototype from '../../../../utils/component-prototype';

export default {
  name: 'LibColors',
  mixins: [ComponentPrototype],
  data() {
    return {
      colors: [
        'brand-black',
        'brand-darkblue',
        'brand-blue',
        'brand-teal',
        'brand-green',
        'brand-yellow',
        'brand-red',
        'brand-crimson',
        'brand-pink',
        'brand-purple',
        'seasonal-red',
        'seasonal-green',
        'seasonal-orange',
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
      lyrics: [
        'I\'ve paid my dues',
        'Time after time',
        'I\'ve done my sentence',
        'But committed no crime',
        'And bad mistakes',
        'I\'ve made a few',
        'I\'ve had my share of sand kicked in my face',
        'But I\'ve come through',
        '(And I need to go on and on, and on, and on)',
        'We are the champions, my friends',
        'And we\'ll keep on fighting \'til the end',
        'We are the champions',
        'We are the champions',
        'No time for losers',
        '\'Cause we are the champions',
        'Of the world',
        'I\'ve taken my bows',
        'And my curtain calls',
        'You brought me fame and fortune and everything that goes with it',
        'I thank you all',
        'But it\'s been no bed of roses',
        'No pleasure cruise',
        'I consider it a challenge before the whole human race',
        'And I ain\'t gonna lose',
        '(And I need just go on and on, and on, and on)',
        'We are the champions, my friends',
        'And we\'ll keep on fighting \'til the end',
        'We are the champions',
        'We are the champions',
        'No time for losers',
        '\'Cause we are the champions',
        'Of the world',
        'We are the champions, my friends',
        'And we\'ll keep on fighting \'til the end',
        'Oh, we are the champions',
        'We are the champions',
        'No time for losers',
        '\'Cause we are the champions',
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
      background: $highlight-secondary;
      flex-wrap: wrap !important;
      &:hover,
      &:focus,
      &:active {
        background: $lowlight-secondary;
        color: $highlight-primary;
      }
      > div {
        margin-right: $micro
      }
      @include md {
        flex-wrap: nowrap !important;
      }
    }
    .back {
      height: $rem;
      width: $rem;
      flex-shrink: 0;
      flex-grow: 0;
      border-radius: 50%;
      @include box-shadow(1);
    }
    .name {
      flex-grow: 0;
      flex-shrink: 0;
    }
    .text {
      margin-left: auto;
      width: 100%;
      @include md {
        width: auto;
      }
    }
  }
</style>
