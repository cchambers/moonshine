/* eslint-disable */
import '@babel/polyfill';

require('./assets/script/core.js');

import Vue from 'vue';
Vue.config.productionTip = false;

/* IE-11 Polyfills */
import 'document-register-element/build/document-register-element';
import './assets/script/polyfills.js'

/* HammerJS (touch support) */
import { VueHammer } from 'vue2-hammer';
Vue.use(VueHammer);

/* Vue Custom Element */
import vueCustomElement from 'vue-custom-element';
Vue.use(vueCustomElement);

/* SH-COMPONENT PROTOTYPE */
import ComponentPrototype from './components/component-prototype';
Vue.mixin(ComponentPrototype);

/* This disables warnings caused by 'undefined vue components' that are actually defined. vce-workaround */
Vue.config.ignoredElements = [
  /^belk-/,
  /^sh-/
]

/* COMMON STYLES */
require('./assets/style/common/base.scss');
require('./assets/style/common/utility.scss');
require('./assets/style/themes/custom-props.scss');

require('./prod-components');
if (process.env.NODE_ENV != 'production') require('./dev-components')