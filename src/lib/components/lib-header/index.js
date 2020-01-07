import Vue from 'vue';
import wrap from '../../../components/wrapper';
import LibHeader from './vue/LibHeader.vue';

const Wrapped = wrap(Vue, LibHeader);
window.customElements.define('lib-header', Wrapped);
