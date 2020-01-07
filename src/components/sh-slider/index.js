import Vue from 'vue';
import wrap from '../wrapper';
import Slider from './vue/Slider.vue';

const Wrapped = wrap(Vue, Slider);
window.customElements.define('sh-slider', Wrapped);
