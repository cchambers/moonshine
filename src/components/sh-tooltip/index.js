import Vue from 'vue';
import wrap from '../wrapper';
import Tooltip from './vue/Tooltip.vue';

const Wrapped = wrap(Vue, Tooltip);
window.customElements.define('sh-tooltip', Wrapped);
