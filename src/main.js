/* eslint-disable */
import 'document-register-element/build/document-register-element'; // IE9 polyfill

import Vue from 'vue'

import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

// import vueCustomElement from 'vue-custom-element'
// Vue.use(vueCustomElement);

Vue.config.productionTip = false

Vue.customElement('sh-button', require('./components/sh-button'));

if (process.env.VUE_APP_DEV) {
  /* non-deployed in prod */
  require('./assets/script/core.js')
  require('./components/sh-control-panel')
  require('./components/sh-curtain')
  require('./components/sh-header')
  require('./components/sh-modal')
  // require('./components/sh-button')
  require('./components/sh-nav')

  require('./assets/script/prism.js')
  require('./assets/style/common/base.scss')
  require('./assets/style/common/utility.scss')
  require('./assets/style/layout.scss')
  require('./assets/style/prism.css')
  require('./components/component-template')
  require('./components/lib-header')
  require('./components/lib-content')
  require('./components/lib-section-links')
  require('./components/lib-notify')
  require('./components/lib-toolbar')
} 
