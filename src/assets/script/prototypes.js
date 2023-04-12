/* eslint-disable */

(function () {
  String.prototype.slugify = function (separator = "-") {
    return this
      .toString()
      .replace('-', ' ')
      // .normalize('NFD')                   // add polyfill for this if it's needed later
      .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
      .replace(/\s+/g, separator);
  };

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
}());
