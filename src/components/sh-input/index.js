import Vue from 'vue';
import wrap from '../wrapper';
import Input from './Input.vue';

const Wrapped = wrap(Vue, Input);
window.customElements.define('sh-input', Wrapped);
