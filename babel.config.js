module.exports = (api) => {
  api.cache(true);

  const presets = [
    ['@babel/env', {
      modules: false,
      targets: '> 1%, ie >= 11',
      useBuiltIns: 'usage',
      corejs: 3,
    }],
    ['@babel/preset-typescript', {
      allExtensions: true,
    }],
  ];
  const plugins = [
    ['@babel/plugin-proposal-decorators', {
      legacy: true,
    }],
    ['@babel/plugin-proposal-class-properties', {
      loose: true,
    }],
  ];
  const sourceType = 'unambiguous';

  return {
    presets,
    plugins,
    sourceType,
  };
};
