const glob = require('glob')
const fs = require('fs')

let pages = {
  index: {
    entry: 'src/main.js',
    template: 'src/index.ejs'
  },
}

glob.sync('./src/components/**/docs/data/*').forEach(path => {  
  let component = path.split('/')[3];
  let filename = path.split('/');
  filename = filename[filename.length-1];
  let name = component+filename;
  
  pages[name] = {
    entry: 'src/blank.js',
    template: path,
    filename: `pagedata/${component}/${filename}`
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
    template: 'src/component.ejs',
    content: content,
    filename: `components/${component}/${filename}`
  }
})

module.exports = {
  runtimeCompiler: true,
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
  pages: pages,
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
      }
    }
  }
}
