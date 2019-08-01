const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');

let nav = fs.readFileSync('./src/documentation/incl-nav.html', 'utf8');
let footer = fs.readFileSync('./src/documentation/incl-footer.html', 'utf8');

let pages = {
  index: {
    entry: 'src/main.js',
    nav: nav,
    footer: footer,
    template: 'src/documentation/docs-index.html'
  }
}

if (process.env.NODE_ENV != 'production') {
  glob.sync('./src/components/**/docs/data/*.html').forEach(path => {  
    let component = path.split('/')[3];
    let filename = path.split('/');
    filename = filename[filename.length-1];
    let name = component+filename;
    
    pages[name] = {
      entry: 'src/blank.js',
      template: path,
      filename: `components/${component}/data/${filename}`
    }
  })

  glob.sync('./src/components/**/docs/*.html').forEach(path => {  
    let component = path.split('/')[3];
    let filename = path.split('/');
    filename = filename[filename.length-1];
    let name = component+filename;
    let content = fs.readFileSync(path, 'utf8');

    pages[name] = {
      entry: 'src/main.js',
      template: 'src/documentation/docs-component.html',
      content: content,
      nav: nav,
      footer: footer,
      filename: `components/${component}/${filename}`
    }
  })

  glob.sync('./src/documentation/utilities/*.html').forEach(path => {  
    let filename = path.split('/');
    filename = filename[filename.length-1];
    let name = filename.split('.')[0];
    let content = fs.readFileSync(path, 'utf8');

    pages[name] = {
      entry: 'src/main.js',
      template: 'src/documentation/docs-component.html',
      content: content,
      nav: nav,
      footer: footer,
      filename: `utilities/${name}/index.html`
    }
  })

  glob.sync('./src/documentation/demos/*.html').forEach(path => {  
    let filename = path.split('/');
    filename = filename[filename.length-1];
    let name = filename.split('.')[0];
    let content = fs.readFileSync(path, 'utf8');

    pages[name] = {
      entry: 'src/main.js',
      template: 'src/documentation/docs-demonstration.html',
      content: content,
      filename: `demo/${name}/index.html`
    }
  })
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
        `
      }
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    optimization: {
      minimize: false
    },
  },

  chainWebpack: config => {
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

  pages: pages,
  
}
