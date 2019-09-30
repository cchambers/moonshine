
/**
 * The sass-loader makes node-sass available to webpack modules.
 *
 * @this {LoaderContext}
 * @param {string} content
 */
function themeLoader(content) {
  let data = content.match(/([^\s]*:(\s.*)[$][A-z]*-[A-z]*);/g);
  // TODO: https://regexr.com/4k3tf
  let str = content;
  if (data) {
    data = [...new Set(data)];

    for (let x = 0, l = data.length; x < l; x += 1) {
      const scss = data[x];

      // make a new string from the SCSS variable: (color: $accent-primary;)
      let newString = `${scss}`;

      // pull the actual variable: ($accent-primary)
      const theVar = newString.match(/([$][A-z]*-[A-z]*)/g);

      // lop off the dollar sign: (accent-primary)
      const noDollar = theVar[0].substr(1);

      // replace the variable with custom prop: var(--accent-primary)
      newString = newString.replace(theVar[0], `var(--${noDollar})`);

      // concatenate old value with new value:
      // ex: color: $accent-primary; color: var(--accent-primary);
      newString = `${scss} ${newString}`;

      // find/replace all occurances
      let regStr = `(?<!-)${scss}`;
      regStr = regStr.replace(/\$/, `${String.fromCharCode(92)}$`);
      const regEx = new RegExp(regStr, 'g');

      str = content.replace(regEx, newString);
    }
  }
  return str;
}

module.exports = themeLoader;
