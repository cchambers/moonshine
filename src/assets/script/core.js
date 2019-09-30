const app = {
  init() {
    app.setup();
    if (location.search) app.urlParamsToObj();
  },

  setup() {
    const iOSCheck = navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') < 0;
    if (iOSCheck) document.getElementsByTagName('html')[0].classList.add('iOS');

    const IE11Check = !(window.ActiveXObject) && 'ActiveXObject' in window;
    if (IE11Check) document.getElementsByTagName('html')[0].classList.add('IE11');

    // let demos = document.querySelectorAll('lib-toolbar');
    // for (let x = 0, l = demos.length; x < l; x += 1) {
    //   demos[x].setAttribute('base-code', demos[x].innerHTML);
    //   demos[x].innerHTML = '';
    // }

    app.interaction = 'keyboard';

    document.addEventListener('keydown', () => {
      if (app.interaction != 'keyboard') {
        app.interaction = 'keyboard';
        document.documentElement.setAttribute('interaction', app.interaction);
      }
    });

    document.addEventListener('click', () => {
      if (app.interaction != 'mouse') {
        app.interaction = 'mouse';
        document.documentElement.setAttribute('interaction', app.interaction);
      }
    });

    document.addEventListener('touchstart', () => {
      if (app.interaction != 'touch') {
        app.interaction = 'touch';
        document.documentElement.setAttribute('interaction', app.interaction);
      }
    });
  },

  urlParamsToObj() {
    let search = location.search.substr(1);
    search = search.replace('&&', '&');
    search = search.replace('&&&', '&');
    const result = JSON.parse(`{"${search.replace(/(&)\1{4,}/g, '","').replace(/=/g, '":"')}"}`, (key, value) => (key === '' ? value : decodeURIComponent(value)));
    location.params = result;
  },
};

app.init();
