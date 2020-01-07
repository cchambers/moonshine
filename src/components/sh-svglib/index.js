import Vue from 'vue';
import wrap from '../wrapper';
import Svglib from './Svglib.vue';

const Wrapped = wrap(Vue, Svglib);
window.customElements.define('sh-svglib', Wrapped);
