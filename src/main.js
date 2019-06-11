import Vue from 'vue'
Vue.config.productionTip = false

// base styles...
require('./assets/style/base.scss')
require('./assets/style/layout.scss')
require('./assets/style/material.scss')

// components
require('./components/sh-button')
require('./components/sh-control-panel')
require('./components/sh-curtain')
require('./components/sh-header')
require('./components/sh-modals')
require('./components/sh-nav')

// mount to container
new Vue().$mount('#xxx')
