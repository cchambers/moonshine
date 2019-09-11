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

  methods: {
    setUUID() {
      this.uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    
    getItem(which, session) {
      let val;
      if (session) {
        val = sessionStorage.getItem(which);
      } else {
        val = localStorage.getItem(which);
      }
      return JSON.parse(val)
    },

    setItem(which, val, session) {
      if (session) {
        sessionStorage.setItem(which, JSON.stringify(val));
      } else {
        localStorage.setItem(which, JSON.stringify(val));
      }
      return true
    },
    
    elementContains(elm, otherElm) {
      if (typeof elm.contains === 'function') {
        return elm.contains(otherElm);
      }

      return false;
    },

    log() {
      let args = arguments;
      window.sh.log = window.sh.log || [];   // store logs to an array for reference
      window.sh.log.push(args);
      let dev = (window.location.href.indexOf('web-belk.demand') > 0);
      
      let level = args[args.length-1];
      level = (typeof level == 'number') ? args.pop() : 0;
      if (dev) {
        let style = 'font-size: 20px;';
        switch(level) {
          default:
            style += 'color: #018786;'
            break;
        }
        let message = args.join(' ');

        // eslint-disable-next-line 
        console.log(`%c ${message}`, style);
      }
    }
  },

  data() {
    return {
      uuid: String
    }
  },

  created() {
    
  },

  mounted() {
    let self = this;
    if (typeof self.events == 'function') setTimeout(self.events);
    self.$bus.$emit('component-ready', self);
  }
};

export default ComponentPrototype