import Vue from 'vue';
import wrap from '../wrapper';
import Banner from './vue/Banner.vue';

const Wrapped = wrap(Vue, Banner);
window.customElements.define('sh-banner', Wrapped);
