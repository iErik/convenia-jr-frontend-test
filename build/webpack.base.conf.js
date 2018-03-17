var path = require('path');
var config = require('./config');
var utils = require('./utils');
var autoprefixer = require('autoprefixer');
var extendOwn = require('underscore').extendOwn;

var projectRoot = path.resolve(__dirname, '../');
var env = process.env.NODE_ENV;

// Check env & config/index.js to decide wheter to enable CSS
// source maps for the various preporcessor loaders added to
// vue-loader.
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap);
var cssSourceMapProd = (env === 'production' && config.build.cssSourceMap);
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

module.exports =
{ entry: { app: './src/main.js' }
, output:
    { path: config.build.assetsRoot
    , publicPath: process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
    , filename: '[name].js'
    }

, resolve:
  { extensions: ['.js', '.vue', '.scss', '.json']
  , modules: [path.join(__dirname, '../node_modules')]
  , alias:
    { vue$: 'vue/dist/vue.common.js'

    , 'src': path.resolve(__dirname, '../src')
    , 'components': path.resolve(__dirname, '../src/components')
    , 'styles': path.resolve(__dirname, '../src/assets/styles')
    , 'img': path.resolve(__dirname, '../src/assets/img')
    }
  }

, module:
  { rules:
    [
      { test: /\.vue$/
      , use:
        [{ loader: 'vue-loader'
        , options:
          { loaders: utils.cssLoaders({ sourceMap: useCssSourceMap })
          , postcss: [ autoprefixer({ browsers: ['last 4 versions'] }) ]
          }
        }]
      }
      ,
      { test: /\.js$/
      , loader: 'babel-loader'
      , include: [ path.join(projectRoot, 'src') ]
      , exclude: /node_modules/
      }
      ,
      { test: /\.(png|jpe?g|gif|svg)(\?.*)?$/
      , loader: 'url-loader'
      , options:
        { limit: 10000
        , name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
