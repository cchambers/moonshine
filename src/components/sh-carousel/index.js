import Vue from 'vue';
import wrap from '../wrapper';
import Carousel from './vue/Carousel.vue';

const Wrapped = wrap(Vue, Carousel);
window.customElements.define('sh-carousel', Wrapped);
