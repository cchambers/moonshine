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
}
