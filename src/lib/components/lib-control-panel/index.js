import Vue from 'vue';
import wrap from '../../../components/wrapper';
import ControlPanel from './vue/ControlPanel.vue';

const Wrapped = wrap(Vue, ControlPanel);
window.customElements.define('lib-control-panel', Wrapped);
