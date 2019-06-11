import Vue from 'vue'
Vue.config.productionTip = false

// base styles...
require('./assets/style/base.scss')
require('./assets/style/layout.scss')

// components
require('./components/sh-button')

// mount to container
new Vue().$mount('#xxx')
