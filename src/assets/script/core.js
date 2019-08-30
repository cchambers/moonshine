let app = {
  init() {
    app.setup();
    if (location.search) app.urlParamsToObj()
  },

  setup() {
    let iOSCheck = navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') < 0;
    if (iOSCheck) document.getElementsByTagName('html')[0].classList.add('iOS');
  
    let IE11Check = !(window.ActiveXObject) && 'ActiveXObject' in window
    if (IE11Check) document.getElementsByTagName('html')[0].classList.add('IE11');

    let demos = document.querySelectorAll('lib-toolbar');
    for (let x = 0, l = demos.length; x < l; x++) {
      demos[x].setAttribute('base-code', demos[x].innerHTML);
      demos[x].innerHTML = '';
    }

    app.interaction = 'keyboard';

    document.addEventListener('keydown', ()=> {
      if (app.interaction != 'keyboard') {
        app.interaction = 'keyboard';
        document.documentElement.setAttribute('interaction', app.interaction);
      }
    });

    document.addEventListener('click', ()=> {
      if (app.interaction != 'mouse') {
        app.interaction = 'mouse';
        document.documentElement.setAttribute('interaction', app.interaction);
      }
    });

    document.addEventListener('touchstart', ()=> {
      if (app.interaction != 'touch') {
        app.interaction = 'touch';
        document.documentElement.setAttribute('interaction', app.interaction);
      }
    });
  },

  urlParamsToObj() {
    let search = location.search.substr(1);
    let result = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
    location.params = result;
  }
}

app.init();

