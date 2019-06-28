/* eslint-disable */
import Vue from 'vue'
import { VueHammer } from 'vue2-hammer'

Vue.use(VueHammer)

Vue.config.productionTip = false

/* prod components */
require('./components/sh-button')
require('./components/sh-modal')
require('./components/belk-app-banner')

if (process.env.VUE_APP_DEV) {
  /* non-deployed in prod */
  require('./components/sh-control-panel')
  require('./components/sh-curtain')
  require('./components/sh-header')
  require('./components/sh-nav')

  /* library stuff */
  require('./assets/script/core.js')
  require('./assets/script/components.js')
  require('./assets/script/prism.js')
  require('./assets/style/common/base.scss')
  require('./assets/style/common/utility.scss')
  require('./assets/style/layout.scss')
  require('./assets/style/prism.css')

  require('./components/lib-header')
  require('./components/lib-content')
  require('./components/lib-section-links')
  require('./components/lib-toolbar')
  require('./components/lib-notify')
} 

// mount to container
new Vue().$mount('#xxx')
