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
import ComponentPrototype from './components/prototype';
Vue.mixin(ComponentPrototype);

/* COMMON STYLES */
require('./assets/style/common/base.scss');
require('./assets/style/common/utility.scss');
require('./assets/style/themes/custom-props.scss');

/* Production Assets */
require('./components/sh-accordion');
require('./components/sh-adapt-content');
require('./components/sh-banner');
require('./components/sh-button');
require('./components/sh-curtain');
require('./components/sh-dropnav');
require('./components/sh-form');
require('./components/sh-header');
require('./components/sh-input');
require('./components/sh-link-list');
require('./components/sh-modal');
require('./components/sh-rating');
require('./components/sh-tabs');
require('./components/sh-tooltip');

/* Non-Production Assets */
if (process.env.NODE_ENV != 'production') {
  require('./assets/script/prism.js');
  require('./assets/style/prism.css');
  require('./components/component-template');
  require('./components/sh-control-panel'); // TODO: make lib-control-panel
  require('./components/sh-nav'); // TODO: make lib-nav
  require('./components/lib-header');
  require('./components/lib-content');
  require('./components/lib-section-links');
  require('./components/lib-notify');
  require('./components/lib-toolbar');
}
