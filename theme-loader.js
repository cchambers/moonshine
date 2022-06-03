/**
 * The sass-loader makes node-sass available to webpack modules.
 *
 * @this {LoaderContext}
 * @param {string} content
 */
function themeLoader(content) {
  let str = content;
  // TODO: https://regexr.com/4k3tf
  let data = str.match(/([^\s]*:(\s.*)[$][A-z]*-[A-z]*);/g);

  if (data) {
    data = [...new Set(data)];

    for (let x = 0, l = data.length; x < l; x += 1) {
      const scss = data[x];

      // make a new string from the SCSS variable: (color: $accent-primary;)
      let newString = `${scss}`;

      // pull the actual variable: ($accent-primary)
      const theVar = newString.match(/([$][A-z]*-[A-z]*)/g);

      for (let y = 0, m = theVar.length; y < m; y += 1) {
        const it = theVar[y];

        // lop off the dollar sign: (accent-primary)
        const noDollar = it.substr(1);

        // replace the variable with custom prop: var(--accent-primary)
        newString = newString.replace(it, `var(--${noDollar})`);

        // concatenate old value with new value:
        // ex: color: $accent-primary; color: var(--accent-primary);
        // 6/1/2022, remove IE support by killing this line: newString = `${scss} ${newString}`;

        // find/replace all occurances
        let regStr = `(?<!-)${scss}`;
        regStr = regStr.replace(/\$/, `${String.fromCharCode(92)}$`);
        const regEx = new RegExp(regStr, 'g');

        str = str.replace(regEx, newString);
      }
    }
  }
  return str;
}

module.exports = themeLoader;
