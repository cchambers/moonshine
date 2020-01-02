import Vue from 'vue';
import wrap from '../wrapper';
import Popper from './vue/Popper.vue';

const Wrapped = wrap(Vue, Popper);
window.customElements.define('sh-popper', Wrapped);
