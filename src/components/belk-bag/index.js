import Vue from 'vue';
import wrap from '../wrapper';
import BelkBag from './BelkBag.vue';

const Wrapped = wrap(Vue, BelkBag);
window.customElements.define('belk-bag', Wrapped);
