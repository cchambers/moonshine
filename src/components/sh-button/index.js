import Vue from 'vue';
import wrap from '../wrapper';
import Button from './vue/Button.vue';

const Wrapped = wrap(Vue, Button);
window.customElements.define('sh-button', Wrapped);
