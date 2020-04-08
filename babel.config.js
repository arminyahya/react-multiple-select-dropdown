module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
  //   'styled-components',
    '@babel/plugin-proposal-class-properties'
  //   '@babel/plugin-syntax-dynamic-import',
  ],
  env: {
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-proposal-class-properties'
        // 'dynamic-import-node'
      ],
    },
  },
};