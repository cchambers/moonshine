var app = {
  init() {
    app.setup();
  },
  setup() {
    var iOSCheck = navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 0;
    if (iOSCheck) document.getElementsByTagName('html')[0].classList.add('iOS');
    
    app.navTriggers = document.querySelectorAll('[nav-toggle]');
    for (var x = 0, l = app.navTriggers.length; x < l; x++) {
      app.navTriggers[x].addEventListener('click', app.toggleNavigation);
    }

    app.modalLinks = app.container.querySelectorAll('[modal-trigger]');
    for (var x = 0, l = app.modalLinks.length; x < l; x++) {
      app.modalLinks[x].addEventListener('click', function(e) {
        app.showModal(this.getAttribute('modal-trigger'));
      });
    }

    app.closeTriggers = app.container.querySelectorAll('[close-modal]');
    for (var x = 0, l = app.closeTriggers.length; x < l; x++) {
      app.closeTriggers[x].addEventListener('click', function(e) {
        for (var y = 0, m = app.modals.length; y < m; y++) {
          app.modals[y].classList.remove('active');
        }
        app.container.classList.remove('modal-shown');
      });
    }
    
    var search = document.getElementById('search');
    var results = document.getElementById('search-results');
    
    search.addEventListener('focus', function () {
      document.documentElement.classList.add('input-active');
      results.classList.add('active')
    });
    
    search.addEventListener('blur', function () {
      var el = document.activeElement;
      if (el !== results) {
        document.documentElement.remove('input-active');
        results.classList.remove('active');
      }
    });
  }
};

app.init();
