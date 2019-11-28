import Vue from 'vue';
import wrap from '../wrapper';
import BelkProductList from './BelkProductList.vue';

const Wrapped = wrap(Vue, BelkProductList);
window.customElements.define('belk-product-list', Wrapped);
