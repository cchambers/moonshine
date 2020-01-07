import Vue from 'vue';
import wrap from '../wrapper';
import BelkHeader from './vue/BelkHeader.vue';

const Wrapped = wrap(Vue, BelkHeader);
window.customElements.define('belk-header', Wrapped);
