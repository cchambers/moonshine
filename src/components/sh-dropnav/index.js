import Vue from 'vue';
import wrap from '../wrapper';
import Dropnav from './Dropnav.vue';

const Wrapped = wrap(Vue, Dropnav);
window.customElements.define('sh-dropnav', Wrapped);
