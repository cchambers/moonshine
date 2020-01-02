import Vue from 'vue';
import wrap from '../../../components/wrapper';
import LibReqs from './vue/LibReqs.vue';

const Wrapped = wrap(Vue, LibReqs);
window.customElements.define('lib-reqs', Wrapped);
