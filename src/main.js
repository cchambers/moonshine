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

/* non-deployed in prod */
require('./components/sh-curtain');
require('./components/sh-header');
require('./components/sh-accordion');
require('./components/sh-button');
require('./components/sh-tooltip');
require('./components/sh-modal');
require('./components/sh-link-list');
require('./components/sh-dropnav');
require('./components/sh-tabs');
require('./components/sh-form');
require('./components/sh-input');

if (process.env.NODE_ENV != 'production') {
  require('./assets/script/prism.js');
  require('./assets/style/common/base.scss');
  require('./assets/style/common/utility.scss');
  require('./assets/style/layout.scss');
  require('./assets/style/prism.css');
  require('./components/component-template');
  require('./components/sh-control-panel');
  require('./components/sh-nav');
  require('./components/lib-header');
  require('./components/lib-content');
  require('./components/lib-section-links');
  require('./components/lib-notify');
  require('./components/lib-toolbar');
}
