'use strict';
/**
 * The sass-loader makes node-sass available to webpack modules.
 *
 * @this {LoaderContext}
 * @param {string} content
 */
function themeLoader(content) {
  let data = content.match(/([^\s]*:\s?[$][A-z]*-[A-z]*);/g);
  
  if (data) {
    for (let x = 0, l = data.length; x < l; x++) {
      let scss = data[x];
      let newString = `${scss}`;
      let theVar = newString.match(/([$][A-z]*-[A-z]*)/g);
      let noDollar = theVar[0].substr(1);
      newString = newString.replace(theVar[0], `var(--${noDollar})`);
      newString = scss + newString;
      content = content.replace(scss, newString)
    }
  }
  return content;
}

module.exports = themeLoader;
