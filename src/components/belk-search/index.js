import Vue from 'vue';
import wrap from '../wrapper';
import BelkSearch from './BelkSearch.vue';

const Wrapped = wrap(Vue, BelkSearch);
window.customElements.define('belk-search', Wrapped);
