import Vue from 'vue';
import wrap from '../wrapper';
import BelkSwatch from './BelkSwatch.vue';

const Wrapped = wrap(Vue, BelkSwatch);
window.customElements.define('belk-swatch', Wrapped);
