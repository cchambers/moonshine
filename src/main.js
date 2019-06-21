/* eslint-disable */
import Vue from 'vue'
Vue.config.productionTip = false

/* prod components */
require('./components/sh-button')

if (process.env.VUE_APP_DEV) {
  /* non-deployed in prod */
  require('./components/sh-control-panel')
  require('./components/sh-curtain')
  require('./components/sh-header')
  require('./components/sh-modal')
  require('./components/sh-nav')

  /* library stuff */
  require('./assets/script/core.js')
  require('./assets/script/components.js')
  require('./assets/script/prism.js')
  require('./assets/style/base.scss')
  require('./assets/style/layout.scss')
  require('./assets/style/prism.css')
  require('./components/lib-header')
  require('./components/lib-content')
  require('./components/lib-section-links')
  require('./components/lib-toolbar')
  require('./components/lib-notify')
  require('./components/component-template')
} 

// mount to container
new Vue().$mount('#xxx')
