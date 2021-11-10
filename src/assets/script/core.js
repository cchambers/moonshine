/* eslint-disable func-names */
const app = {
  interaction: 'keyboard',
  banners: [],

  init() {
    app.setup();
    app.events();
    if (window.location.search) {
      app.urlParamsToObj();
    } else {
      window.location.params = {};
    }
    if (window.localStorage) {
      const interaction = window.localStorage.getItem('last-interaction');
      if (app.interaction !== interaction) this.interactionHandler(interaction);
    }
  },

  setup() {
    const iOSCheck = navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') < 0;
    if (iOSCheck) document.querySelector('html').classList.add('iOS');

    const IE11Check = !(window.ActiveXObject) && 'ActiveXObject' in window;
    if (IE11Check) {
      document.querySelector('html').classList.add('IE11');
      setTimeout(() => {
        window.sh.emit('ie11');
      }, 2500);
    }

    const demos = document.querySelectorAll('lib-toolbar');
    for (let x = 0, l = demos.length; x < l; x += 1) {
      const html = demos[x].innerHTML;
      demos[x].setAttribute('base-code', html);
      // demos[x].innerHTML = '';
    }
    return this;
  },

  events() {
    document.addEventListener('keypress', (e) => {
      if (e.altKey || e.ctrlKey) return;
      app.interactionHandler('keyboard');
    });

    document.addEventListener('click', () => {
      app.interactionHandler('mouse');
    });

    const scrollDebounced = app.debounce((event) => {
      app.interactionHandler('mouse');
      window.sh.emit('scroll-event', event);
    }, 50, 'scroll-debounce');
    window.addEventListener('scroll', scrollDebounced, true);

    const resizeDebounced = app.debounce((event) => {
      app.interactionHandler('mouse');
      window.sh.emit('resize-event', event);
    }, 50, 'resize-debounce');
    window.addEventListener('resize', resizeDebounced, true);

    const touchDebounced = app.debounce(() => {
      app.interactionHandler('touch');
    }, 100);
    window.addEventListener('touchmove', touchDebounced, true);

    document.addEventListener('touchstart', () => {
      app.interactionHandler('touch');
    });
  },

  interactionHandler(type) {
    if (app.interaction !== type) {
      app.interaction = type;
      if (window.localStorage) {
        window.localStorage.setItem('last-interaction', type);
        document.documentElement.setAttribute('interaction', type);
      }
    }
  },

  cookieParamsToObj() {
    let str = document.cookie;
    str = str.split(', ');
    const result = {};
    for (let i = 0; i < str.length; i += 1) {
      const cur = str[i].split('=');
      // eslint-disable-next-line prefer-destructuring
      result[cur[0]] = cur[1];
    }
    return result;
  },

  timers: {},

  debounce(func, wait = 100, name = 'default') {
    return function (...args) {
      clearTimeout(app.timers[name]);
      app.timers[name] = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  },

  urlParamsToObj() {
    let { search } = window.location;
    search = search.replace(/\?&/g, '');
    search = search.replace(/\?/g, '');
    search = search.replace(/=/g, ':');
    search = search.split('&');
    const params = {};
    search.forEach((param) => {
      const str = param.replace(/('|")/g, '').trim();
      const split = str.split(':');
      if (split.length) {
        if (split[1]) {
          params[split[0].trim()] = split[1].trim();
        }
      }
    });
    if (params) window.location.params = params;
  },
};

app.init();
