/* eslint-disable */
import 'core-js/stable';
// import 'regenerator-runtime/runtime';

require('./assets/script/core.js');
import Vue from 'vue';
Vue.config.productionTip = false;

/* IE-11 Polyfills */
// import 'document-register-element/build/document-register-element';
import './assets/script/polyfills.js';
import 'whatwg-fetch';

/* HammerJS (touch support) */
import {
  VueHammer
} from 'vue2-hammer';
Vue.use(VueHammer);

/* Vue Custom Element */
import vueCustomElement from 'vue-custom-element';
Vue.use(vueCustomElement);

/* This disables warnings caused by 'undefined vue components' that are actually defined. vce-workaround */
Vue.config.ignoredElements = [/.*/]

/* COMMON STYLES */
require('./assets/style/common/base.scss');
require('./assets/style/common/utility.scss');
require('./assets/style/themes/custom-props.scss');
require('./assets/style/themes/default/belk.scss');

const schema = require('./components/all.json');

if (process.env.NODE_ENV !== 'production') {
  /* Documentation Library */
  require('./assets/script/prism.js');
  require('./assets/style/prism.css');
  require('./assets/style/docs.scss');
  require('./lib/components/lib-control-panel/vue');
  require('./lib/components/lib-nav/vue');
  require('./lib/components/lib-header/vue');
  require('./lib/components/lib-icons/vue');
  require('./lib/components/lib-content/vue');
  require('./lib/components/lib-section-links/vue');
  require('./lib/components/lib-notify/vue');
  require('./lib/components/lib-reqs/vue');
  require('./lib/components/lib-toolbar/vue');
  require('./lib/components/tool-banner/vue');
  window.schema = schema;
}

Object.keys(schema)
  .forEach(function (cat) {
    Object.keys(schema[cat])
      .forEach(function (item) {
        require(`./components/${item}/vue/index.js`);
      });
  });
