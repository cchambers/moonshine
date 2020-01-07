import Vue from 'vue';
import wrap from '../wrapper';
import AdaptContent from './vue/AdaptContent.vue';

const Wrapped = wrap(Vue, AdaptContent);
window.customElements.define('sh-adapt-content', Wrapped);
