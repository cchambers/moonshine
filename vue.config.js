const glob = require('glob')
const fs = require('fs-extra')

let nav = fs.readFileSync('./src/documentation/docs-nav.html', 'utf8');

let pages = {
  index: {
    entry: 'src/main.js',
    nav: nav,
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
      filename: `components/${component}/${filename}`
    }
  })

  glob.sync('./src/documentation/utilities/*.html').forEach(path => {  
    let filename = path.split('/');
    filename = filename[filename.length-1];
    let name = filename;
    let content = fs.readFileSync(path, 'utf8');

    pages[name] = {
      entry: 'src/main.js',
      template: 'src/documentation/docs-component.html',
      content: content,
      nav: nav,
      filename: `utilities/${filename}`
    }
  })
}

module.exports = {
  runtimeCompiler: false,
  filenameHashing: false,
  css: {
    loaderOptions: {
      sass: {
        data: `
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
    }
  },
  pages: pages,
}
