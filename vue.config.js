/* eslint-disable */
const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const branch = require('git-branch');
const fullName = require('fullname');
const WrapperPlugin = require('wrapper-webpack-plugin');
const dateFormat = require('dateformat');
const ejs = require('ejs');
const ua = require('universal-analytics');

const themeLoader = path.resolve('theme-loader.js');
const user = ua('UA-148739944-1');
const dateNow = new Date();
dateFormat(dateNow, 'dddd, mmmm dS, yyyy, h:MM:ss TT');

const branchActual = branch.sync();
let buildTag = '';
let gitName;

(async () => {
  gitName = await fullName();
  buildTag = `/*!
  *         __     __
  * .-----.|  |--.|__|.-----.-----.
  * |__ --||     ||  ||     |  -__|
  * |_____||__|__||__||__|__|_____|
  *
  * built by: ${gitName}
  * branch: \`${branchActual}\`
  * timestamp: ${dateNow}
*/\n\n`;
  const type = (process.env.NODE_ENV === 'production') ? 'Prod' : 'Development';
  user.event(`${type} Build`, gitName)
    .send();
})();

let optimizationSetting = {
  minimize: false,
};

if (branchActual === 'master') {
  optimizationSetting = {
    minimize: true,
  };
}

const openToPage = process.env.PAGE || '';

const pages = {
  index: {
    entry: 'src/main.js',
    template: 'src/lib/docs-index.html',
  },
};

if (process.env.NODE_ENV !== 'production') {
  const headTemplate = fs.readFileSync('./src/lib/incl-head.ejs', 'utf8');
  const docsHead = ejs.render(headTemplate, {
    dirname: __dirname,
  });
  const docsFoot = fs.readFileSync('./src/lib/incl-foot.ejs', 'utf8');
  glob.sync('src/components/**/docs/data/*.html')
    .forEach((dir) => {
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

  glob.sync('src/components/**/docs/*.ejs')
    .forEach((dir) => {
      const component = dir.split('/')[2];
      let filename = dir.split('/');
      let schemaDir = dir.replace(/(docs\/)([a-zA-Z0-9\s_\\.\-():])+(.html|.ejs)$/, '');
      schemaDir = `${schemaDir}schema.json`;
      filename = filename[filename.length - 1];
      const name = `${component}/${filename}`;
      let schema = fs.readFileSync(schemaDir, 'utf8');
      const url = `components/${component}/${filename.split('.')[0]}.html`;
      schema = JSON.parse(schema);
      pages[name] = {
        entry: 'src/main.js',
        template: dir,
        filename: url,
        title: schema.name || 'configure schema.json',
        description: schema.description || {},
        tags: schema.tags || {},
        reqs: schema.reqs || {},
        docsHead,
        docsFoot,
      };
    });

  glob.sync('src/components/**/docs/*.ejs')
    .forEach((dir) => {
      const component = dir.split('/')[2];
      let filename = dir.split('/');
      let schemaDir = dir.replace(/(docs\/)([a-zA-Z0-9\s_\\.\-():])+(.html|.ejs)$/, '');
      schemaDir = `${schemaDir}schema.json`;
      filename = filename[filename.length - 1];
      const name = `${component}/${filename}`;
      let schema = fs.readFileSync(schemaDir, 'utf8');
      const url = `components/${component}/${filename.split('.')[0]}.html`;
      schema = JSON.parse(schema);
      pages[name] = {
        entry: 'src/main.js',
        template: dir,
        filename: url,
        title: schema.name || 'configure schema.json',
        description: schema.description || {},
        tags: schema.tags || {},
        reqs: schema.reqs || {},
        docsHead,
        docsFoot,
      };
    });

  glob.sync('src/lib/tools/**/*.ejs')
    .forEach((dir) => {
      const name = dir.split('/')[3];
      let filename = dir.split('/');
      filename = filename[filename.length - 1];
      const test = dir.split('/');
      test.pop();
      let schemaDir = test.join('/');
      schemaDir = `${schemaDir}/schema.json`;
      let schema = fs.readFileSync(schemaDir, 'utf8');
      schema = JSON.parse(schema);
      const tool = `${name}/${filename}`;
      const url = `tools/${schema.url}/${filename.split('.')[0]}.html`;
      pages[tool] = {
        entry: 'src/main.js',
        template: dir,
        filename: url,
        title: schema.name || 'configure schema.json',
        description: schema.description || {},
        tags: schema.tags || {},
        reqs: schema.reqs || {},
        docsHead,
        docsFoot,
      };
    });

  glob.sync('src/lib/utilities/*.ejs')
    .forEach((dir) => {
      let filename = dir.split('/');
      filename = filename[filename.length - 1];
      const name = filename.split('.')[0];

      pages[name] = {
        entry: 'src/main.js',
        template: dir,
        docsHead,
        title: 'Shine Utility',
        docsFoot,
        filename: `utilities/${name}/index.html`,
      };
    });

  glob.sync('src/lib/demos/*.html')
    .forEach((dir) => {
      let filename = dir.split('/');
      filename = filename[filename.length - 1];
      const name = filename.split('.')[0];

      pages[name] = {
        entry: 'src/main.js',
        template: dir,
        filename: `demo/${name}/index.html`,
      };
    });
}

module.exports = {
  runtimeCompiler: false,
  filenameHashing: false,

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
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }]
    },
    devServer: {
      openPage: openToPage,
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
    function addStyleResource(rule) {
      rule.use('shine-theme-loader')
        .loader(themeLoader);
    }

    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) => addStyleResource(config.module.rule('scss')
      .oneOf(type)));

    if (process.env.NODE_ENV !== 'production') {
      config.module
        .rule('ejs')
        .test(/\.ejs|.html$/)
        .use('ejs-compiled-loader')
        .loader('ejs-compiled-loader')
        .end();
    }
  },

  pages,

  pluginOptions: {
    lintStyleOnBuild: false,
    stylelint: {},
  },
};
