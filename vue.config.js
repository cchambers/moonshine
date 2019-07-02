const glob = require('glob')
const fs = require('fs')

let nav = fs.readFileSync('./src/nav.ejs', 'utf8');

let pages = {
  index: {
    entry: 'src/main.js',
    nav: nav,
    template: 'src/docs-index.html'
  }
}

if (process.env.VUE_APP_DEV) {
  glob.sync('./src/components/**/docs/data/*').forEach(path => {  
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
      template: 'src/docs-component.html',
      content: content,
      nav: nav,
      filename: `components/${component}/${filename}`
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
