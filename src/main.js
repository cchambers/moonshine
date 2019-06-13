import Vue from 'vue'

Vue.config.productionTip = false

require('./assets/script/core.js')

// base styles...
require('./assets/style/base.scss')
require('./assets/style/layout.scss')

// components
require('./components/sh-button')
require('./components/sh-control-panel')
require('./components/sh-curtain')
require('./components/sh-header')
require('./components/sh-modals')
require('./components/sh-nav')

if (process.env.VUE_APP_DEV) {
  require('./components/lib-toolbar')
  // require('./components/lib-index')
  require('./components/component-template')
}

// mount to container
new Vue().$mount('#xxx')