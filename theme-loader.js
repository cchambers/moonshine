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
    data = [...new Set(data)];

    for (let x = 0, l = data.length; x < l; x++) {
      let scss = data[x];
      
      // make a new string from the SCSS variable: (color: $accent-primary;)
      let newString = `${scss}`;

      // pull the actual variable: ($accent-primary)
      let theVar = newString.match(/([$][A-z]*-[A-z]*)/g);

      // lop off the dollar sign: (accent-primary)
      let noDollar = theVar[0].substr(1);

      // replace the variable with custom prop: var(--accent-primary)
      newString = newString.replace(theVar[0], `var(--${noDollar})`);

      // concatenate old value with new value:
      // color: $accent-primary; color: var(--accent-primary);
      newString = `${scss} ${newString}`;

      var regStr = `(?<!-)${scss}`;
      regStr = regStr.replace(/\$/, String.fromCharCode(92) + '$');
      var regEx = new RegExp(regStr, 'g');

      content = content.replace(regEx, newString);
      
      // content = content.split(scss).join(newString);
    }
  }
  return content;
}

module.exports = themeLoader;
