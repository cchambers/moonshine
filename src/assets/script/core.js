let app = {
  init() {
    // eslint-disable-next-line
    console.log("%cdistilling components", "border-radius: 15px; margin: 10px; background: #121212; color: white; font-family: sans-serif; font-size: 14px; padding: 5px 10px;")
    
    app.setup();

  },

  setup() {
    let iOSCheck = navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 0;
    if (iOSCheck) document.getElementsByTagName('html')[0].classList.add('iOS');

    let demos = document.querySelectorAll('lib-toolbar');
    for (let x = 0, l = demos.length; x < l; x++) {
      demos[x].setAttribute('base-code', demos[x].innerHTML);
    }
  }
};

app.init();

