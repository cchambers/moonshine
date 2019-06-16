import Vue from 'vue'

export default {
  name: 'Content',
  data() {
    return {
      html: '<p>This component does not have documentation yet.</p>',
      pageData: {
        type: Object,
        default: {
          name: 'NO'
        }
      }
    }
  },

  mounted() {
    let path = location.pathname;
    if (path.match('component')) {
      let which = path.split('/components/')[1];
      let url = '/pagedata/'+which+'/index.html';
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send(null);
      
      xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            let response = xhr.responseText;
            if (response.match("<html")) {
              // do nothing
            } else {
              let html = response.split("</head>")[1];
              html = html.split("<script")[0];
              // CAN CAPTURE STUFF INSIDE TOOLBAR HERE?
              var res = Vue.compile(html);
              new Vue({
                render: res.render,
                staticRenderFns: res.staticRenderFns
              }).$mount('#library-content');
              window.Prism.highlightAll();
            }
          }
        }
      }
    }
  }
}