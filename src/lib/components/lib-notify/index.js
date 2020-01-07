import Vue from 'vue';
import wrap from '../../../components/wrapper';
import LibNotify from './vue/LibNotify.vue';

const Wrapped = wrap(Vue, LibNotify);
window.customElements.define('lib-notify', Wrapped);
