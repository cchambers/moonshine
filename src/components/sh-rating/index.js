import Vue from 'vue';
import wrap from '../wrapper';
import Rating from './vue/Rating.vue';

const Wrapped = wrap(Vue, Rating);
window.customElements.define('sh-rating', Wrapped);
