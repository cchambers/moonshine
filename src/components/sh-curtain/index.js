import Vue from 'vue';
import wrap from '../wrapper';
import Curtain from './Curtain.vue';

const Wrapped = wrap(Vue, Curtain);
window.customElements.define('sh-curtain', Wrapped);
