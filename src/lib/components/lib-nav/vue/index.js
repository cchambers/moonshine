import { defineCustomElement } from 'vue';
import Nav from './Nav.vue';

const CustomElement = defineCustomElement(Nav);
window.customElements.define('lib-nav', CustomElement);
