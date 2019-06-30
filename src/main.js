/* eslint-disable */
import Vue from 'vue'
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

import vueCustomElement from 'vue-custom-element'
import 'document-register-element/build/document-register-element'; // IE9 polyfill
Vue.use(vueCustomElement);

Vue.config.productionTip = false

  /* library stuff */
  if (process.env.VUE_APP_DEV) require('./assets/script/core.js')

/* prod components */
require('./components/sh-button/index.js')
require('./components/sh-modal/index.js')

if (process.env.VUE_APP_DEV) {
  /* non-deployed in prod */
  require('./components/sh-control-panel')
  require('./components/sh-curtain')
  require('./components/sh-header')
  require('./components/sh-nav')

  require('./assets/script/components.js')
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
