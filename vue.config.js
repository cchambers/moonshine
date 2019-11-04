const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const branch = require('git-branch');
const fullName = require('fullname');
const WrapperPlugin = require('wrapper-webpack-plugin');
const dateFormat = require('dateformat');

const dateNow = new Date();
dateFormat(dateNow, 'dddd, mmmm dS, yyyy, h:MM:ss TT');

const branchActual = branch.sync();
let gitName = 'unset';
let buildTag;

(async () => {
  gitName = await fullName();
  buildTag = `/*!
  *         __     __                 __        
  * .-----.|  |--.|__|.-----.-----.  |__|.-----.
  * |__ --||     ||  ||     |  -__|__|  ||__ --|
  * |_____||__|__||__||__|__|_____|__|  ||_____|
  *                                  |___|       
  * built by: ${gitName}
  * branch: \`${branchActual}\`
  * timestamp: ${dateNow}
*/\n\n`;
})();

let optimizationSetting = {
  minimize: false,
};

if (branchActual === 'master') {
  optimizationSetting = {
    minimize: true,
  };
}

const nav = fs.readFileSync('./src/lib/incl-nav.html', 'utf8');
const footer = fs.readFileSync('./src/lib/incl-footer.html', 'utf8');

const pages = {
  index: {
    entry: 'src/main.js',
    nav,
    footer,
    template: 'src/lib/docs-index.html',
  },
};

if (process.env.NODE_ENV !== 'production') {
  glob.sync('./src/components/**/docs/data/*.html').forEach((dir) => {
    const component = dir.split('/')[3];
    let filename = dir.split('/');
    filename = filename[filename.length - 1];
    const name = component + filename;

    pages[name] = {
      entry: 'src/blank.js',
      template: dir,
      filename: `components/${component}/data/${filename}`,
    };
  });

  glob.sync('./src/components/**/docs/*.html').forEach((dir) => {
    const component = dir.split('/')[3];
    let filename = dir.split('/');
    filename = filename[filename.length - 1];
    const name = component + filename;
    const content = fs.readFileSync(dir, 'utf8');

    pages[name] = {
      entry: 'src/main.js',
      template: 'src/lib/docs-component.html',
      content,
      nav,
      footer,
      filename: `components/${component}/${filename}`,
    };
  });

  glob.sync('./src/lib/utilities/*.html').forEach((dir) => {
    let filename = dir.split('/');
    filename = filename[filename.length - 1];
    const name = filename.split('.')[0];
    const content = fs.readFileSync(dir, 'utf8');

    pages[name] = {
      entry: 'src/main.js',
      template: 'src/lib/docs-component.html',
      content,
      nav,
      footer,
      filename: `utilities/${name}/index.html`,
    };
  });

  glob.sync('./src/lib/demos/*.html').forEach((dir) => {
    let filename = dir.split('/');
    filename = filename[filename.length - 1];
    const name = filename.split('.')[0];
    const content = fs.readFileSync(dir, 'utf8');

    pages[name] = {
      entry: 'src/main.js',
      template: 'src/lib/docs-demonstration.html',
      content,
      filename: `demo/${name}/index.html`,
    };
  });
}


module.exports = {
  runtimeCompiler: false,
  filenameHashing: false,
  // transpileDependencies: ['vue2-hammer', 'vue-custom-element'],

  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/style/common/_functions.scss";
          @import "@/assets/style/common/_mixins.scss";
          @import "@/assets/style/themes/default/_variables.scss";
        `,
      },
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
    optimization: optimizationSetting,
    plugins: [
      new WrapperPlugin({
        header() {
          return buildTag;
        },
      }),
    ],
  },

  chainWebpack: (config) => {
    const themeLoader = path.resolve('theme-loader.js');

    const vueRule = config.module.rule('scss').oneOf('vue');
    vueRule.use('shine-theme-loader').loader(themeLoader).end();

    const normalRule = config.module.rule('scss').oneOf('normal');
    normalRule.use('shine-theme-loader').loader(themeLoader).end();

    const vueModules = config.module.rule('scss').oneOf('vue-modules');
    vueModules.use('shine-theme-loader').loader(themeLoader).end();

    const normalModules = config.module.rule('scss').oneOf('normal-modules');
    normalModules.use('shine-theme-loader').loader(themeLoader).end();
  },

  pages,

};
