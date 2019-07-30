let app = {
  init() {
    app.setup();
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
  }
}

app.init();

