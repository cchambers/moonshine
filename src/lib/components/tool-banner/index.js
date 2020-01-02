import Vue from 'vue';
import wrap from '../../../components/wrapper';
import ToolBanner from './vue/ToolBanner.vue';

const Wrapped = wrap(Vue, ToolBanner);
window.customElements.define('tool-banner', Wrapped);
