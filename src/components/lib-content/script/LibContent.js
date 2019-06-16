import Vue from 'vue'
import { EventBus } from '../../event-bus';

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
    let self = this;
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
              // eslint-disable-next-line 
              console.log("%cdistilling components", "border-radius: 15px; margin: 10px; background: #121212; color: white; font-family: sans-serif; font-size: 14px; padding: 5px 10px;")
              new Vue({
                render: res.render,
                staticRenderFns: res.staticRenderFns
              }).$mount('#library-content');
              window.Prism.highlightAll();
              self.docEvents();
            }
          }
        }
      }
    }
  },

  methods: {
    copyText(el) {
      var win = window;
      var doc = win.document, sel, range;
      if (win.getSelection && doc.createRange) {
          sel = win.getSelection();
          range = doc.createRange();
          range.selectNodeContents(el);
          sel.removeAllRanges();
          sel.addRange(range);
      } else if (doc.body.createTextRange) {
          range = doc.body.createTextRange();
          range.moveToElementText(el);
          range.select();
      }
      document.execCommand("copy");
      EventBus.$emit('notify', { type: 'default', message: 'Copied to clipboard.' })
    },

    docEvents() { 
      let self = this;
      let tds = document.querySelectorAll("td:nth-child(1)");
      
      for (let x = 0, l = tds.length; x < l; x++) {
        tds[x].addEventListener('click', function () {
          self.copyText(tds[x]);
        })
      }
      let pageName = document.querySelector('h1').innerText;
      EventBus.$emit('header-page-name', pageName);
    }
  }
}