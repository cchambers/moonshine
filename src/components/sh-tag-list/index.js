import Vue from 'vue';
import wrap from '../wrapper';
import TagList from './vue/TagList.vue';

const Wrapped = wrap(Vue, TagList);
window.customElements.define('sh-tag-list', Wrapped);
