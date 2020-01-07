import Vue from 'vue';
import wrap from '../wrapper';
import Tabs from './vue/Tabs.vue';

const Wrapped = wrap(Vue, Tabs);
window.customElements.define('sh-tabs', Wrapped);
