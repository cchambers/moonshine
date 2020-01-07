import Vue from 'vue';
import wrap from '../../../components/wrapper';
import LibSectionLinks from './vue/LibSectionLinks.vue';

const Wrapped = wrap(Vue, LibSectionLinks);
window.customElements.define('lib-section-links', Wrapped);
