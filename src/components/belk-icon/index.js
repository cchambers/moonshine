import Vue from 'vue';
import wrap from '../wrapper';
import BelkIcon from './vue/BelkIcon.vue';

const Wrapped = wrap(Vue, BelkIcon);
window.customElements.define('belk-icon', Wrapped);
