var path = require('path');

module.exports = {
  build: {
    env: { NODE_ENV: '"production"' },
    index: path.resolve(__dirname, '../index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '.',
    assetsPublicPath: './dist/',
    cssSourceMap: false
  },
  dev: {
    env: { NODE_ENV: '"development"' },
    port: 8080,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    cssSourceMap: true
  }
}
