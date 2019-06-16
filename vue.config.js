const glob = require('glob')
let pages = {
  index: {
    entry: 'src/main.js',
    template: 'public/index.html'
  },
}

glob.sync('./src/components/**/docs/index.html').forEach(path => {  
  let name = path.split("/")[3];
  pages[name] = {
    entry: 'src/component.js',
    template: path,
    filename: 'pagedata/'+name+'/index.html'
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
