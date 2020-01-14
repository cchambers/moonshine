import Vue from 'vue';
import wrap from '../wrapper';
import Form from './Form.vue';

const Wrapped = wrap(Vue, Form);
window.customElements.define('sh-form', Wrapped);
