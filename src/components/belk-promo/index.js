import Vue from 'vue';
import wrap from '../wrapper';
import BelkPromo from './BelkPromo.vue';

const Wrapped = wrap(Vue, BelkPromo);
window.customElements.define('belk-promo', Wrapped);
