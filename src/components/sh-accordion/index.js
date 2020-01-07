import Vue from 'vue';
import wrap from '../wrapper';
import Accordion from './vue/Accordion.vue';

const Wrapped = wrap(Vue, Accordion);
window.customElements.define('sh-accordion', Wrapped);
