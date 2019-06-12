var app = {
  init() {
    // eslint-disable-next-line
    console.log("%cdistilling components", "border-radius: 15px; margin: 10px; background: #121212; color: white; font-family: sans-serif; font-size: 14px; padding: 5px 10px;")
    app.setup();
  },
  setup() {
    var iOSCheck = navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 0;
    if (iOSCheck) document.getElementsByTagName('html')[0].classList.add('iOS');
  }
};

app.init();

