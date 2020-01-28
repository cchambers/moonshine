module.exports = (api) => {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', {
      modules: false,
      targets: '> 1%, ie >= 11',
      useBuiltIns: 'entry',
      corejs: 3,
    }],
    ['@babel/preset-typescript', {
      allExtensions: true,
    }],
  ];
  const sourceType = 'unambiguous';

  return {
    presets
  };
};
