import Vue from 'vue';
import wrap from '../wrapper';
import Combo from './vue/Combo.vue';

const Wrapped = wrap(Vue, Combo);
window.customElements.define('sh-combo', Wrapped);
