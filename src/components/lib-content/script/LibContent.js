// import Vue from 'vue'
import { EventBus } from '../../event-bus';

export default {
  name: 'Content',
  data() {
    return {
      html: '<p class="absolute text-center" style="top:15%;width:100%;max-width:40rem;left:50%;transform:translateX(-50%)">If we had a <span class="bold">404</span> page this would be it!<br>Hit the <code class="px20 bold">`</code> key to search for stuff.</p><svg id="f698cf57-4f6b-4529-a39c-70592e247574" preserveAspectRatio="xMidYMax meet" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="840" height="726.85" viewBox="0 0 840 726.85"><defs><linearGradient id="aba94383-0ea8-4a3d-bf3d-6bf7d0bb624b" x1="432" y1="245.78" x2="432" y2="18.85" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="gray" stop-opacity="0.25"/><stop offset="0.54" stop-color="gray" stop-opacity="0.12"/><stop offset="1" stop-color="gray" stop-opacity="0.1"/></linearGradient><linearGradient id="e6500262-d2e6-47ad-ace4-95109017cb85" x1="447.27" y1="1916.01" x2="447.27" y2="1730.58" gradientTransform="matrix(0.95, 0.32, -0.32, 0.95, 752.71, -1245.02)" xlink:href="#aba94383-0ea8-4a3d-bf3d-6bf7d0bb624b"/><linearGradient id="ba3c64e7-a915-4515-a2e7-88140805555d" x1="334.27" y1="1539.38" x2="334.27" y2="1353.95" gradientTransform="matrix(0.95, 0.32, -0.32, 0.95, 752.71, -1245.02)" xlink:href="#aba94383-0ea8-4a3d-bf3d-6bf7d0bb624b"/><linearGradient id="fa3dfd3f-e414-4f67-9974-b38d7e79cebc" x1="432" y1="258.09" x2="432" y2="103.27" xlink:href="#aba94383-0ea8-4a3d-bf3d-6bf7d0bb624b"/></defs><title>Taken</title><g opacity="0.8"><ellipse cx="432" cy="132.31" rx="146.46" ry="113.46" fill="url(#aba94383-0ea8-4a3d-bf3d-6bf7d0bb624b)"/></g><ellipse cx="432" cy="132.31" rx="143.21" ry="110.94" fill="#0083ba"/><path d="M491.94,231.21c0-61.27,64.11-110.94,143.2-110.94A175.54,175.54,0,0,1,706.5,135c-25.17-17-58.1-27.33-94.14-27.33-79.09,0-143.21,49.67-143.21,110.94,0,41.14,28.91,77.05,71.86,96.21C510.94,294.48,491.94,264.57,491.94,231.21Z" transform="translate(-180 -86.57)" fill="#fff" opacity="0.1"/><polygon points="432 176.9 590.76 451.88 749.52 726.85 432 726.85 114.48 726.85 273.24 451.88 432 176.9" fill="#0083ba" opacity="0.2"/><g opacity="0.3"><path d="M649.67,652.79,662,616.2a62.66,62.66,0,0,0-23.2-70.89l.1-.06a61.48,61.48,0,0,0-15.79-8h0l-.17-.06-.19-.06h0a61.55,61.55,0,0,0-16.9-3.18,59.28,59.28,0,0,0-6.11,0,62.32,62.32,0,0,0-10.49,1.45c-1,.22-2,.47-2.91.74s-1.93.56-2.88.87c-1.9.63-3.77,1.34-5.6,2.15-.92.4-1.83.82-2.72,1.27a61.47,61.47,0,0,0-7.75,4.56c-.83.57-1.64,1.16-2.44,1.76a62,62,0,0,0-21.24,29.6L524.33,634a61.86,61.86,0,0,0-2.68,28.12c.2,1.45.45,2.89.74,4.32s.65,2.84,1,4.24c.27.93.55,1.86.86,2.78.46,1.37,1,2.74,1.51,4.08.37.89.76,1.78,1.17,2.66.81,1.75,1.71,3.46,2.68,5.13s2,3.3,3.16,4.88c.84,1.18,1.73,2.34,2.65,3.46,1.24,1.5,2.54,3,3.92,4.33a61.81,61.81,0,0,0,21,13.89h0l0,0,.34.14a21.66,21.66,0,0,1,1.4-2.17c3-4.11,8.22-7,13.19-5.92.36.08.72.19,1.08.3,2.52.89,5,2.48,7.43,3.26a6.66,6.66,0,0,0,5.61-.07c4.86-2.59,3.06-10.76,7.23-14.34a6.5,6.5,0,0,1,.61-.46,1.88,1.88,0,0,1-.16-.23c3.22-2,7.68-.67,11.39.62,4,1.41,9.22,2.36,12-.91,1.88-2.24,1.74-5.65,3.53-8,2.08-2.7,6-3,9.39-2.52l.17.05c6.5,2.68,13.6-1.77,13.1-8.78C646.06,663.51,649,654.7,649.67,652.79Z" transform="translate(-180 -86.57)" fill="url(#e6500262-d2e6-47ad-ace4-95109017cb85)"/></g><path d="M563.21,706.78c2.92-4,7.93-6.8,12.73-5.71s9.35,5.66,13.62,3.37c5.84-3.12,1.7-14.59,11.18-15.44a12.44,12.44,0,0,1,5.77,1c4,1.63,10.26,3.47,13.34-.2,1.81-2.16,1.68-5.45,3.41-7.69,2-2.6,5.81-2.93,9.06-2.43l.16.05c6.27,2.59,13.13-1.71,12.64-8.47-.63-9,2.23-17.48,2.85-19.32l11.88-35.31A60.38,60.38,0,0,0,622,540.34h0a60.38,60.38,0,0,0-76.27,37.86L527,633.73a60.39,60.39,0,0,0,34.82,75.15A21.47,21.47,0,0,1,563.21,706.78Z" transform="translate(-180 -86.57)" fill="#fff"/><circle cx="405.35" cy="486.08" r="6.51" opacity="0.2"/><circle cx="442.37" cy="498.53" r="6.51" opacity="0.2"/><ellipse cx="595.55" cy="603.56" rx="9.76" ry="6.51" transform="translate(-346.41 888.98) rotate(-71.4)" fill="#e0e0e0"/><circle cx="552.53" cy="487.52" r="9.76" fill="#fff"/><circle cx="583.45" cy="472.17" r="4.88" fill="#fff"/><g opacity="0.5"><g opacity="0.3"><path d="M662.67,259.79,675,223.2a62.66,62.66,0,0,0-23.2-70.89l.1-.06a61.48,61.48,0,0,0-15.79-8h0l-.17-.06-.19-.06h0a61.55,61.55,0,0,0-16.9-3.18,59.28,59.28,0,0,0-6.11,0,62.32,62.32,0,0,0-10.49,1.45c-1,.22-2,.47-2.91.74s-1.93.56-2.88.87c-1.9.63-3.77,1.34-5.6,2.15-.92.4-1.83.82-2.72,1.27a61.47,61.47,0,0,0-7.75,4.56c-.83.57-1.64,1.16-2.44,1.76a62,62,0,0,0-21.24,29.6L537.33,241a61.86,61.86,0,0,0-2.68,28.12c.2,1.45.45,2.89.74,4.32s.65,2.84,1,4.24c.27.93.55,1.86.86,2.78.46,1.37,1,2.74,1.51,4.08.37.89.76,1.78,1.17,2.66.81,1.75,1.71,3.46,2.68,5.13s2,3.3,3.16,4.88c.84,1.18,1.73,2.34,2.65,3.46,1.24,1.5,2.54,2.95,3.92,4.33a61.81,61.81,0,0,0,21,13.89h0l0,0,.34.14a21.66,21.66,0,0,1,1.4-2.17c3-4.11,8.22-7,13.19-5.92.36.08.72.19,1.08.3,2.52.89,5,2.48,7.43,3.26a6.66,6.66,0,0,0,5.61-.07c4.86-2.59,3.06-10.76,7.23-14.34a6.5,6.5,0,0,1,.61-.46,1.88,1.88,0,0,1-.16-.23c3.22-2,7.68-.67,11.39.62,4,1.41,9.22,2.36,12-.91,1.88-2.24,1.74-5.65,3.53-8,2.08-2.7,6-3,9.39-2.52l.17,0c6.5,2.68,13.6-1.77,13.1-8.78C659.06,270.51,662,261.7,662.67,259.79Z" transform="translate(-180 -86.57)" fill="url(#ba3c64e7-a915-4515-a2e7-88140805555d)"/></g><path d="M576.21,313.78c2.92-4,7.93-6.8,12.73-5.71s9.35,5.66,13.62,3.37c5.84-3.12,1.7-14.59,11.18-15.44a12.44,12.44,0,0,1,5.77,1c4,1.63,10.26,3.47,13.34-.2,1.81-2.16,1.68-5.45,3.41-7.69,2-2.6,5.81-2.93,9.06-2.43l.16.05c6.27,2.59,13.13-1.71,12.64-8.47-.63-9,2.23-17.48,2.85-19.32l11.88-35.31A60.38,60.38,0,0,0,635,147.34h0a60.38,60.38,0,0,0-76.27,37.86L540,240.73a60.39,60.39,0,0,0,34.82,75.15A21.47,21.47,0,0,1,576.21,313.78Z" transform="translate(-180 -86.57)" fill="#fff"/><circle cx="418.35" cy="93.08" r="6.51" opacity="0.2"/><circle cx="455.37" cy="105.53" r="6.51" opacity="0.2"/></g><path d="M749.52,186A87.52,87.52,0,0,1,752.31,208c0,61.27-64.11,110.94-143.2,110.94C544.38,318.9,489.69,285.64,472,240c13.14,50.77,71,89,140.41,89,79.09,0,143.21-49.67,143.21-110.94A88.16,88.16,0,0,0,749.52,186Z" transform="translate(-180 -86.57)" opacity="0.1"/><g opacity="0.8"><ellipse cx="432" cy="180.68" rx="296.18" ry="77.41" fill="url(#fa3dfd3f-e414-4f67-9974-b38d7e79cebc)"/></g><path d="M612,192.4c-158.18,0-286.42,33.51-286.42,74.86H898.42C898.42,225.91,770.18,192.4,612,192.4Z" transform="translate(-180 -86.57)" fill="#fff"/><path d="M612,342.11c158.18,0,286.42-33.51,286.42-74.85H325.58C325.58,308.6,453.82,342.11,612,342.11Z" transform="translate(-180 -86.57)" fill="#fff"/><path d="M612,342.11c158.18,0,286.42-33.51,286.42-74.85H325.58C325.58,308.6,453.82,342.11,612,342.11Z" transform="translate(-180 -86.57)" opacity="0.05"/><rect x="295.3" y="161.15" width="273.4" height="39.06" rx="17.22" opacity="0.05"/><path d="M313.89,144.38a3.68,3.68,0,0,1-2.05-4.44,1.86,1.86,0,0,0,.08-.41h0a1.84,1.84,0,0,0-3.31-1.22h0a1.82,1.82,0,0,0-.2.36,3.67,3.67,0,0,1-4.44,2.05,2,2,0,0,0-.41-.08h0a1.84,1.84,0,0,0-1.22,3.31h0a1.62,1.62,0,0,0,.36.21,3.68,3.68,0,0,1,2.05,4.44,1.89,1.89,0,0,0-.08.4h0a1.84,1.84,0,0,0,3.31,1.23h0a1.65,1.65,0,0,0,.2-.37,3.67,3.67,0,0,1,4.44-2,2,2,0,0,0,.41.08h0a1.84,1.84,0,0,0,1.22-3.31h0A1.62,1.62,0,0,0,313.89,144.38Z" transform="translate(-180 -86.57)" fill="#4d8af0" opacity="0.5"/><path d="M822.89,450.38a3.68,3.68,0,0,1-2-4.44,1.86,1.86,0,0,0,.08-.41h0a1.84,1.84,0,0,0-3.31-1.22h0a1.82,1.82,0,0,0-.2.36,3.67,3.67,0,0,1-4.44,2.05,2,2,0,0,0-.41-.08h0a1.84,1.84,0,0,0-1.22,3.31h0a1.62,1.62,0,0,0,.36.21,3.68,3.68,0,0,1,2,4.44,1.89,1.89,0,0,0-.08.4h0a1.84,1.84,0,0,0,3.31,1.23h0a1.65,1.65,0,0,0,.2-.37,3.67,3.67,0,0,1,4.44-2,2,2,0,0,0,.41.08h0a1.84,1.84,0,0,0,1.22-3.31h0A1.62,1.62,0,0,0,822.89,450.38Z" transform="translate(-180 -86.57)" fill="#4d8af0" opacity="0.5"/><path d="M260.89,592.38a3.68,3.68,0,0,1-2.05-4.44,1.86,1.86,0,0,0,.08-.41h0a1.84,1.84,0,0,0-3.31-1.22h0a1.82,1.82,0,0,0-.2.36,3.67,3.67,0,0,1-4.44,2.05,2,2,0,0,0-.41-.08h0a1.84,1.84,0,0,0-1.22,3.31h0a1.62,1.62,0,0,0,.36.21,3.68,3.68,0,0,1,2.05,4.44,1.89,1.89,0,0,0-.08.4h0a1.84,1.84,0,0,0,3.31,1.23h0a1.65,1.65,0,0,0,.2-.37,3.67,3.67,0,0,1,4.44-2,2,2,0,0,0,.41.08h0a1.84,1.84,0,0,0,1.22-3.31h0A1.62,1.62,0,0,0,260.89,592.38Z" transform="translate(-180 -86.57)" fill="#4d8af0" opacity="0.5"/><path d="M205.89,261.38a3.68,3.68,0,0,1-2-4.44,1.86,1.86,0,0,0,.08-.41h0a1.84,1.84,0,0,0-3.31-1.22h0a1.82,1.82,0,0,0-.2.36,3.67,3.67,0,0,1-4.44,2.05,2,2,0,0,0-.41-.08h0a1.84,1.84,0,0,0-1.22,3.31h0a1.62,1.62,0,0,0,.36.21,3.68,3.68,0,0,1,2.05,4.44,1.89,1.89,0,0,0-.08.4h0a1.84,1.84,0,0,0,3.31,1.23h0a1.65,1.65,0,0,0,.2-.37,3.67,3.67,0,0,1,4.44-2,2,2,0,0,0,.41.08h0a1.84,1.84,0,0,0,1.22-3.31h0A1.62,1.62,0,0,0,205.89,261.38Z" transform="translate(-180 -86.57)" fill="#4d8af0" opacity="0.5"/><path d="M812.89,93.38a3.68,3.68,0,0,1-2-4.44,1.86,1.86,0,0,0,.08-.41h0a1.84,1.84,0,0,0-3.31-1.22h0a1.82,1.82,0,0,0-.2.36,3.67,3.67,0,0,1-4.44,2,2,2,0,0,0-.41-.08h0A1.84,1.84,0,0,0,801.34,93h0a1.62,1.62,0,0,0,.36.21,3.68,3.68,0,0,1,2,4.44,1.89,1.89,0,0,0-.08.4h0A1.84,1.84,0,0,0,807,99.23h0a1.65,1.65,0,0,0,.2-.37,3.67,3.67,0,0,1,4.44-2,2,2,0,0,0,.41.08h0a1.84,1.84,0,0,0,1.22-3.31h0A1.62,1.62,0,0,0,812.89,93.38Z" transform="translate(-180 -86.57)" fill="#4d8af0" opacity="0.5"/><g opacity="0.5"><rect x="110" y="257.85" width="3" height="17" fill="#47e6b1"/><rect x="290" y="344.43" width="3" height="17" transform="translate(464.43 -25.15) rotate(90)" fill="#47e6b1"/></g><g opacity="0.5"><rect x="830" y="177.85" width="3" height="17" fill="#47e6b1"/><rect x="1010" y="264.43" width="3" height="17" transform="translate(1104.43 -825.15) rotate(90)" fill="#47e6b1"/></g><g opacity="0.5"><rect x="730" y="456.85" width="3" height="17" fill="#47e6b1"/><rect x="910" y="543.43" width="3" height="17" transform="translate(1283.43 -446.15) rotate(90)" fill="#47e6b1"/></g><circle cx="723" cy="81.85" r="6" fill="#f55f44" opacity="0.5"/><circle cx="6" cy="12.85" r="6" fill="#f55f44" opacity="0.5"/><circle cx="186" cy="357.85" r="6" fill="#f55f44" opacity="0.5"/><ellipse cx="234" cy="154.43" rx="34" ry="7" opacity="0.05"/><ellipse cx="234" cy="207.43" rx="34" ry="7" opacity="0.05"/><ellipse cx="621" cy="154.43" rx="34" ry="7" opacity="0.05"/><ellipse cx="621" cy="207.43" rx="34" ry="7" opacity="0.05"/><ellipse cx="432" cy="124.43" rx="34" ry="7" opacity="0.05"/><ellipse cx="457" cy="51.43" rx="34" ry="7" opacity="0.05"/><ellipse cx="392" cy="81.43" rx="34" ry="7" opacity="0.05"/><ellipse cx="517" cy="94.43" rx="34" ry="7" opacity="0.05"/><ellipse cx="432" cy="228.43" rx="34" ry="7" opacity="0.05"/></svg>',
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
    self.docEvents();
    self.sectionLinks();

    // let path = location.pathname;
    // if (path.match('component')) {
    //   let which = path.split('/components/')[1];
    //   let url = '/pagedata/'+which+'/index.html';
    //   let xhr = new XMLHttpRequest();
    //   xhr.open('GET', url);
    //   xhr.send(null);
      
    //   xhr.onreadystatechange = function () {
    //     let DONE = 4; // readyState 4 means the request is done.
    //     let OK = 200; // status 200 is a successful return.
    //     if (xhr.readyState === DONE) {
    //       if (xhr.status === OK) {
    //         let response = xhr.responseText;
            
    //         if (response.match('<html')) {
    //           // do nothing
    //         } else {
    //           let html = response.split('</head>')[1];
    //           html = html.split('<script')[0];
              
    //           let updateCode = document.createElement('div');
    //           updateCode.innerHTML = html;

    //           let demos = updateCode.querySelectorAll('lib-toolbar');
    //           for (let x = 0, l = demos.length; x < l; x++) {
    //             let code = demos[x].innerHTML;
    //             demos[x].setAttribute('base-code', code);
    //           }

    //           self.html = html;

    //           // let res = Vue.compile(updateCode.innerHTML);
    //           // new Vue({
    //           //   render: res.render,
    //           //   staticRenderFns: res.staticRenderFns
    //           // }).$mount('#library-content');
              
    //           self.docEvents();
    //           self.sectionLinks();
              
    //           // eslint-disable-next-line 
    //           console.info('%cdistilling components', 'border-radius: 15px; margin: 10px; background: #121212; color: white; font-family: sans-serif; font-size: 14px; padding: 5px 10px;');
    //           setTimeout(window.Prism.highlightAll,20);
    //         }

    //         setTimeout( function() {
    //           self.$el.setAttribute('content-loaded', true);
    //         });
    //       }
    //     }
    //   }
    // }
  },

  methods: {
    copyText(el) {
      let win = window;
      let doc = win.document, sel, range;
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
      let pageName = document.querySelector('h1')
      if (pageName) pageName = pageName.innerText;
      EventBus.$emit('header-page-name', pageName);
    },

    sectionLinks() {
      let links = [];
      let els = document.querySelectorAll('section[id]');
      for (let x = 0, l = els.length; x < l; x++) {
        let href = els[x].id;
        links.push(`<a href="#${href}">${href}</a>`)
      }
      links = links.join('');
      setTimeout(function() { EventBus.$emit('section-links', links) });
    }
  }
}