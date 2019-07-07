'use strict';
const fs = require('fs-extra');

/**
 * The sass-loader makes node-sass available to webpack modules.
 *
 * @this {LoaderContext}
 * @param {string} content
 */
function themeLoader(content) {

  let themes = ['dark'];
  let themeData = [content];

  for (let x = 0, l = themes.length; x < l; x++) {
    let theme = themes[x];
    let vars = fs.readFileSync(`./src/assets/style/themes/${theme}/_variables.scss`, 'utf8');
    let split = vars.split('}');
    split.push(content);
    split.push('}');
    let data = split.join('');
    themeData.push(data);
  }

  content = themeData.join('');
  return content;
}

module.exports = themeLoader;
