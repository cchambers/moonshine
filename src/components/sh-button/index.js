import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);

import Button from './vue/Button';

Vue.customElement('sh-button', Button);