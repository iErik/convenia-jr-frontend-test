var path = require('path');
var config = require('./config');
var utils = require('./utils');
var webpack = require('webpack');
var merge = require('webpack-merge');
var extendOwn = require('underscore').extendOwn;

var baseWebpackConfig = require('./webpack.base.conf');
var UglifyJsPlugin    = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const env = config.build.env;

module.exports = merge(baseWebpackConfig, {
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    publicPath: config.build.assetsPublicPath
  },

  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.cssSourceMap,
      extract: true
    })
  },

  devtool: config.build.cssSourceMap ? '#source-map' : false,
  mode: 'production',

  plugins: [
    // The DefinePlugin allows you to create global constants which can be
    // configured at compile time.
    new webpack.DefinePlugin({
      'process.env': env
    }),

    // Minimize all JavaScript output of chunks. Loaders are switched into
    // minimizing mode. You can pass an object containing UglifyJS options.
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      }
    }),

    // Assign the module and chunk ids by occurrence count. Ids that are
    // used often get lower (shorter) ids. This make ids predictable,
    // reduces total file size and is recommended.
    new webpack.optimize.OccurrenceOrderPlugin(),

    // It moves every require("style.css") in entry chunks into a separate
    // css output file. So your styles are no longer inlined into the
    // javascript, but separate in a css bundle file (styles.css)
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: true
    }),


    // Generates an HTML5 file for you that includes all your webpack
    // bundles in the body/head using script/link tags.
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // More options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // Necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    })
  ]
})
