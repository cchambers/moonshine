/* eslint-disable */ 

import Vue from 'vue';
import { EventBus } from './event-bus';

Vue.prototype.$bus = EventBus;
Vue.prototype.$appName = 'Shine';
Vue.prototype.$prefix = 'sh';

const ComponentPrototype = {
  props: {
    variant: {
      type: String,
      default: 'default',
    },
  },

  data() {
    return {
      timers: [],
    };
  },

  methods: {
    slug(text) {
      let str = text;
      str = str.replace(/^\s+|\s+$/g, '');
      str = str.toLowerCase();
      const from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
      const to   = "aaaaaeeeeiiiioooouuuunc------";
      for (let i = 0, l = from.length ; i < l; i += 1) {
          str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }
      str = str.replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      return str;
    },

    isMobile() {
      return window.matchMedia('(max-width: 768px)').matches;
    },

    isTablet() {
      return window.matchMedia('(max-width: 960px)').matches;
    },

    debounce(name = 'default', func, wait = 100, immediate) {
      if (!this.timers) this.timers = {};
      return (...args) => {
        const context = this;
        const later = () => {
          this.timers[name] = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !this.timers[name];
        clearTimeout(this.timers[name]);
        this.timers[name] = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },

    setUUID() {
      this.uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

    makeUUID() {
      let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
      return uuid;
    },

    getItem(which, session) {
      let val;
      if (session) {
        val = sessionStorage.getItem(which);
      } else {
        val = localStorage.getItem(which);
      }
      return JSON.parse(val);
    },

    setItem(which, val, session) {
      if (session) {
        sessionStorage.setItem(which, JSON.stringify(val));
      } else {
        const test = JSON.stringify(val);
        localStorage.setItem(which, test);
      }
      return true;
    },

    elementContains(elm, otherElm) {
      if (typeof elm.contains === 'function') {
        return elm.contains(otherElm);
      }

      return false;
    },

    getNested(obj, ...args) {
      return args.reduce((obj, level) => obj && obj[level], obj)
    },

    log(...args) {
      window.sh.log = window.sh.log || []; // store logs to an array for reference
      let level = args[args.length - 1];
      level = (typeof level === 'number') ? args.pop() : 0;
      const dev = (window.location.href.indexOf('belk.demand') >= 0) || (window.location.href.indexOf('localhost') >= 0);
      const message = args.join();
      if (dev) {
        let style = 'font-size: 18px;';
        switch (level) {
          case 2:
            style += ' color: #ff5500;';
            break;
          default:
            style += ' color: #0667a0;';
            break;
        }
        // eslint-disable-next-line
        console.log(`%c ${message}`, style);
      }

      window.sh.log.push(message);
    },
  },

  data() {
    return {
      uuid: String,
    };
  },

  created() {
    const globalVariantControl = this.getNested(window.utag_data, 'variantControl', this.$options.name);
    const directVariantControl = this.getNested(window.utag_data, 'variantControl', this.uniqueId);
    if (globalVariantControl && !directVariantControl) this.variant = globalVariantControl;
    if (directVariantControl) this.variant = directVariantControl;
  },

  mounted() {
    const self = this;
    if (typeof self.events === 'function') setTimeout(self.events);
    // self.$bus.$emit('component-ready', self);
  },
};

export default ComponentPrototype;
