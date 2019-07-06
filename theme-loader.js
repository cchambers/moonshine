"use strict";
/**
 * The sass-loader makes node-sass available to webpack modules.
 *
 * @this {LoaderContext}
 * @param {string} content
 */
function themeLoader(content) {
    /*
    EVERY THEME...
      [theme="${name}"] {
        ${themeVars}
        ${content}
      } 
    END EVERY THEME
    content
    */
  return content;
}

module.exports = themeLoader;
