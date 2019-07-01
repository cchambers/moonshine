/* eslint-disable */

require('./assets/script/core.js')

import Vue from 'vue'
Vue.config.productionTip = false

import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement)

/* non-deployed in prod */
require('./components/sh-control-panel')
require('./components/sh-curtain')
require('./components/sh-header')
require('./components/sh-button')
require('./components/sh-modal')
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

  // if (process.env.VUE_APP_DEV) {} 
