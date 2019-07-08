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
    this.uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  mounted() {
    this.$bus.$emit('component-ready', this);
  } 
};

export default ComponentPrototype