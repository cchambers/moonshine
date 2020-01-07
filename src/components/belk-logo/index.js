import Vue from 'vue';
import wrap from '../wrapper';
import BelkLogo from './vue/BelkLogo.vue';

const Wrapped = wrap(Vue, BelkLogo);
window.customElements.define('belk-logo', Wrapped);
