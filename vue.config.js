const glob = require('glob')
let pages = {
  index: {
    entry: 'src/main.js',
    template: 'public/index.html'
  },
}

glob.sync('./src/components/**/docs/*').forEach(path => {  
  let component = path.split('/')[3];
  let filename = path.split('/');
  filename = filename[filename.length-1];
  let name = component+filename;
  pages[name] = {
    entry: 'src/component.js',
    template: path,
    filename: `pagedata/${component}/${filename}`
  }
})

module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/style/_variables.scss";
          @import "@/assets/style/_mixins.scss";
        `
      }
    }
  },
  pages: pages,
}
