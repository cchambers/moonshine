let app = {
  init() {
    app.wrap().setup();
  },

  wrap() {
    if (document.getElementById('xxx')) return this;

    let parent = document.body;
    let wrapper = document.createElement('div');
    wrapper.id = 'xxx';

    // let page = document.createElement('div');
    // page.id = 'page';
    // wrapper.appendChild(page);

    parent.appendChild(wrapper);
    wrapper.setAttribute('v-cloak', true);

    while (parent.firstChild !== wrapper) {
      wrapper.appendChild(parent.firstChild);
      // page.appendChild(parent.firstChild);
    }
    return this;
  },

  setup() {
    let iOSCheck = navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 0;
    if (iOSCheck) document.getElementsByTagName('html')[0].classList.add('iOS');

    let demos = document.querySelectorAll('lib-toolbar');
    for (let x = 0, l = demos.length; x < l; x++) {
      demos[x].setAttribute('base-code', demos[x].innerHTML);
    }
  }
}

app.init();

