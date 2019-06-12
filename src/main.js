import Vue from 'vue'
Vue.config.productionTip = false

require('./assets/script/core.js')

// base styles...
require('./assets/style/base.scss')
require('./assets/style/layout.scss')

// components to skip in prod
require('./components/demo-toolbar')
require('./components/component-template')

// components
require('./components/sh-button')
require('./components/sh-control-panel')
require('./components/sh-curtain')
require('./components/sh-header')
require('./components/sh-modals')
require('./components/sh-nav')

// mount to container
new Vue().$mount('#xxx')
