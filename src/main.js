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

<<<<<<< HEAD
const ComponentPrototype = {
  mounted() {
    this.$bus.$emit('component-ready', this);
    this.$bus.$on('page-ready', () => {
      if (typeof this.onReady == 'function') this.onReady();
    })
  } 
};
=======
/* COMMON STYLES */
require('./assets/style/common/base.scss');
require('./assets/style/common/utility.scss');
require('./assets/style/themes/custom-props.scss');
>>>>>>> 89a847f646223fba491a16170ee4bc31a186422c



<<<<<<< HEAD
require('./components/belk-app-banner')
// TODO: require('./components/belk-header')

=======
/* PRODUCTION ASSETS */
require('./components/sh-accordion');
require('./components/sh-adapt-content');
require('./components/sh-banner');
require('./components/sh-button');
require('./components/sh-carousel');
require('./components/sh-combo');
require('./components/sh-curtain');
require('./components/sh-dropnav');
require('./components/sh-form');
require('./components/sh-header');
require('./components/sh-input');
require('./components/sh-link-list');
require('./components/sh-modal');
require('./components/sh-rating');
require('./components/sh-slider');
require('./components/sh-tabs');
require('./components/sh-tooltip');


/* NON-PRODUCTION ASSETS */
>>>>>>> 89a847f646223fba491a16170ee4bc31a186422c
if (process.env.NODE_ENV != 'production') {
  require('./assets/script/prism.js');
  require('./assets/style/prism.css');
  require('./assets/style/docs.scss')
  require('./components/component-template');
  require('./components/lib-control-panel');
  require('./components/lib-nav');
  require('./components/lib-header');
  require('./components/lib-content');
  require('./components/lib-section-links');
  require('./components/lib-notify');
  require('./components/lib-toolbar');
}
