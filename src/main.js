/* eslint-disable */

require('./assets/script/core.js')

import Vue from 'vue'
Vue.config.productionTip = false

import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement)

import { EventBus } from '../src/components/event-bus.js';

Vue.prototype.$bus = EventBus;
Vue.prototype.$appName = 'Shine';
Vue.prototype.$prefix = 'sh';

const ComponentPrototype = {
  mounted() {
    this.$bus.$emit('component-ready', this);
    this.$bus.$on('page-ready', () => {
      if (typeof this.onReady == 'function') this.onReady();
    })
  } 
};

Vue.mixin(ComponentPrototype);

/* non-deployed in prod */
require('./components/sh-curtain')
require('./components/sh-header')
require('./components/sh-button')
require('./components/sh-tooltip')
require('./components/sh-modal')
<<<<<<< HEAD
require('./components/sh-nav')
require('./components/belk-app-banner')
require('./components/belk-header')

require('./assets/script/prism.js')
require('./assets/style/common/base.scss')
require('./assets/style/common/utility.scss')
require('./assets/style/layout.scss')
require('./assets/style/prism.css')
=======
>>>>>>> 25687f03b611f07bd1b950f9068097ea0677bdba

require('./components/belk-app-banner')
// TODO: require('./components/belk-header')

if (process.env.NODE_ENV != 'production') {
  require('./assets/script/prism.js')
  require('./assets/style/common/base.scss')
  require('./assets/style/common/utility.scss')
  require('./assets/style/layout.scss')
  require('./assets/style/prism.css')
  require('./components/component-template')
  require('./components/sh-control-panel')
  require('./components/sh-nav')
  require('./components/lib-header')
  require('./components/lib-content')
  require('./components/lib-section-links')
  require('./components/lib-notify')
  require('./components/lib-toolbar')
}
