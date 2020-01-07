import Vue from 'vue';
import wrap from '../wrapper';
import NavItem from './NavItem.vue';

const Wrapped = wrap(Vue, NavItem);
window.customElements.define('sh-nav-item', Wrapped);
