import Vue from 'vue';
import wrap from '../../../components/wrapper';
import Content from './vue/LibContent.vue';

const Wrapped = wrap(Vue, Content);
window.customElements.define('lib-content', Wrapped);
