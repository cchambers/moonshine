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
    
      $highlight-primary: #BB86FC;
      $highlight-secondary: rgb(25,25,25);
      $highlight-tertiary: #3700B3;
      $highlight-quaternary: #272822;
    
      $lowlight-primary: $purple;
      $lowlight-secondary: #272822;
      $lowlight-tertiary: rgb(100,100,100);
      $lowlight-quaternary: rgb(165,165,165);
      $lowlight-quinary: rgb(200,200,200);
    
      $accent-primary: rgb(157, 208, 230);
      $accent-secondary: rgb(129, 177, 210);
      $accent-tertiary: rgb(0,131,186);
      $accent-quaternary: rgb(6, 103, 160);
      $accent-quinary: rgb(41, 57, 115);
      ${content}
    }`;
  return content;
}

module.exports = themeLoader;
