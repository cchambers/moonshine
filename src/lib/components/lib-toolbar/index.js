import Vue from 'vue';
import wrap from '../../../components/wrapper';
import LibToolbar from './vue/LibToolbar.vue';

const Wrapped = wrap(Vue, LibToolbar);
window.customElements.define('lib-toolbar', Wrapped);
