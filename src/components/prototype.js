import Vue from 'vue';
import { EventBus } from './event-bus.js';

Vue.prototype.$bus = EventBus;
Vue.prototype.$appName = 'Shine';
Vue.prototype.$prefix = 'sh';

const ComponentPrototype = {
  props: {
      variant: {
        type: String,
        value: 'default'
      }
  },

  data() {
    return {
      uuid: String
    }
  },

  created() {
    this.uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  },

  mounted() {
    this.$bus.$emit('component-ready', this);
  } 
};

export default ComponentPrototype