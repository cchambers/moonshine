/* eslint-disable */

(function () {
  String.prototype.toTitleCase = function () {
    'use strict';
    const ignore = 'and,the,in,with,an,or,at,of,a,to,for'.split(',');
    let text = this.toString();
    let split = text.split(' ');
    for (let x = 0; x < split.length; x++) {
      if (x > 0) {
        if (ignore.indexOf(split[x].toLowerCase()) < 0) {
          split[x] = split[x].replace(/\w\S*/g, (txt) => {
            return txt.charAt(0)
              .toUpperCase() + txt.substr(1)
              .toLowerCase();
          })
        };
      } else {
        split[x] = split[x].replace(/\w\S*/g, (txt) => {
          return txt.charAt(0)
            .toUpperCase() + txt.substr(1)
            .toLowerCase();
        })
      }
    }
    return split.join(' ');
  }
  

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: null
    };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  if (typeof window.CustomEvent !== 'function') {
    window.CustomEvent = CustomEvent;
  }


  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      let el = this;

      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }

  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback /* , thisArg */ ) {
      let T;
      let k;

      if (this === null) {
        throw new TypeError('this is null or not defined');
      }

      // 1. Let O be the result of calling toObject() passing the
      // |this| value as the argument.
      const O = Object(this);

      // 2. Let lenValue be the result of calling the Get() internal
      // method of O with the argument "length".
      // 3. Let len be toUint32(lenValue).
      const len = O.length >>> 0;

      // 4. If isCallable(callback) is false, throw a TypeError exception.
      // See: http://es5.github.com/#x9.11
      if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`);
      }

      // 5. If thisArg was supplied, let T be thisArg; else let
      // T be undefined.
      if (arguments.length > 1) {
        T = arguments[1];
      }

      // 6. Let k be 0.
      k = 0;

      // 7. Repeat while k < len.
      while (k < len) {
        var kValue;

        // a. Let Pk be ToString(k).
        //    This is implicit for LHS operands of the in operator.
        // b. Let kPresent be the result of calling the HasProperty
        //    internal method of O with argument Pk.
        //    This step can be combined with c.
        // c. If kPresent is true, then
        if (k in O) {
          // i. Let kValue be the result of calling the Get internal
          // method of O with argument Pk.
          kValue = O[k];

          // ii. Call the Call internal method of callback with T as
          // the this value and argument list containing kValue, k, and O.
          callback.call(T, kValue, k, O);
        }
        // d. Increase k by 1.
        k += 1;
      }
      // 8. return undefined.
    };
  }

  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('prepend')) {
        return;
      }
      Object.defineProperty(item, 'prepend', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function prepend() {
          var argArr = Array.prototype.slice.call(arguments),
            docFrag = document.createDocumentFragment();

          argArr.forEach(function (argItem) {
            var isNode = argItem instanceof Node;
            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
          });

          this.insertBefore(docFrag, this.firstChild);
        }
      });
    });
  })([Element.prototype, Document.prototype, DocumentFragment.prototype]);

  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('remove')) {
        return;
      }
      Object.defineProperty(item, 'remove', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function remove() {
          if (this.parentNode === null) {
            return;
          }
          this.parentNode.removeChild(this);
        }
      });
    });
  })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
}());
