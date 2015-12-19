/**
 * Created by eliorb on 19/12/2015.
 */
var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');

var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
var CommonsChunkPlugin   = webpack.optimize.CommonsChunkPlugin;
var DedupePlugin   = webpack.optimize.DedupePlugin;
var DefinePlugin   = webpack.DefinePlugin;
var NormalModuleReplacementPlugin = webpack.NormalModuleReplacementPlugin;

module.exports = {
  devtool: 'eval',
  debug: true,
  cache: true,
  verbose: true,
  displayErrorDetails: true,
  context: __dirname,
  stats: {colors: true, reasons: true},

  devServer: {
    inline: true,
    colors: true,
    historyApiFallback: true,
    contentBase: 'app',
    publicPath: '/dist'
  },

  entry: {
    'angular2': [
      'rxjs',
      'zone.js',
      'reflect-metadata',
      'angular2/angular2',
      'angular2/core',
      'angular2/router'
    ],
    'app': './app/main.ts',
    'vendor': [
    /**
     * include any 3rd party lib here
     */
      'lodash/index'
    ]
  },

  output: {
    path: 'dist',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: __dirname,
    extensions: ['', '.webpack.js', '.ts', '.js']
  },

  module: {
    loaders: [
      {test: /\.jade$/, loader: 'jade'},
      {test: /\.json$/, loader: 'json'},
      {test: /\.css$/, loader: 'raw!autoprefixer?browsers=last 2 versions'},
      {test: /\.scss$/, loader: 'raw!sass!autoprefixer?browsers=last 2 versions'},
      {test: /\.png$/, loader: "url?limit=1000000000&mimetype=images/png"},
      {
        test: /\.ts$/, loader: 'ts',
        query: {
          'ignoreDiagnostics': []
        },
        exclude: [
          /\.min\.js$/,
          /\.spec\.ts$/,
          /\.e2e\.ts$/,
          /web_modules/,
          /test/,
          /node_modules/
        ]
      }
    ]
  },

  plugins: [
    new NormalModuleReplacementPlugin(/config.json/, 'app/config/dev.json'),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'VERSION': JSON.stringify(pkg.version),
      '__DEV__': process.env.NODE_ENV === 'development' ? 'true' : 'false'
    }),
    new OccurenceOrderPlugin(),
    new DedupePlugin(),

    new CommonsChunkPlugin({
      name: 'angular2',
      minChunks: Infinity,
      filename: 'angular2.js'
    }),
    new CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js'
    })
  ],

  node: {
    crypto: false,
    __filename: true
  }
};
