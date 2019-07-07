"use strict";

/**
 * The sass-loader makes node-sass available to webpack modules.
 *
 * @this {LoaderContext}
 * @param {string} content
 */
function themeLoader(content) {

  content = `${content}
    [theme="dark"] {
      $lightpurple: #BB86FC;
      $purple: #3700B3;
      $green: #03DAC6;
    
      $highlight-primary: rgb(157, 208, 230);
      $highlight-secondary: rgb(25,25,25);
      $highlight-tertiary: #03DAC6;
      $highlight-quaternary: #4e1b96;
    
      $lowlight-primary: $purple;
      $lowlight-secondary: #272822;
      $lowlight-tertiary: rgb(200,200,200);
      $lowlight-quaternary: #222;
      $lowlight-quinary: $purple;
    
      $accent-primary: #BB86FC;
      $accent-secondary:#03DAC6;
      $accent-tertiary: #BB86FC;
      $accent-quaternary: $purple;
      $accent-quinary: $purple;
    
      $back-primary: $lowlight-secondary;
      ${content}
    }`;
  return content;
}

module.exports = themeLoader;
