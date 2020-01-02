import Vue from 'vue';
import wrap from '../../../components/wrapper';
import Nav from './vue/Nav.vue';

const Wrapped = wrap(Vue, Nav);
window.customElements.define('lib-nav', Wrapped);
