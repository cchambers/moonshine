import Vue from 'vue';
import wrap from '../wrapper';
import Modal from './Modal.vue';

const Wrapped = wrap(Vue, Modal);
window.customElements.define('sh-modal', Wrapped);
