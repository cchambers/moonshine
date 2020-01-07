import Vue from 'vue';
import wrap from '../wrapper';
import BelkTakeover from './vue/BelkTakeover.vue';

const Wrapped = wrap(Vue, BelkTakeover);
window.customElements.define('belk-takeover', Wrapped);
