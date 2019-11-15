window.app = {
  init() {
    window.app.setup();
  },

  setup() {
    const iOSCheck = navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') < 0;

    if (iOSCheck) document.getElementsByTagName('html')[0].classList.add('iOS');

    const demos = document.querySelectorAll('lib-toolbar');
    for (let x = 0, l = demos.length; x < l; x += 1) {
      demos[x].setAttribute('base-code', demos[x].innerHTML);
      demos[x].innerHTML = '';
    }
    return this;
  },

  isMobile() {
    return window.matchMedia('screen and (max-width: 767px)').matches;
  },
};

window.app.init();
