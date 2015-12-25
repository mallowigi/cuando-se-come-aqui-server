/**
 * Created by eliorb on 19/12/2015.
 */
var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');
var src = __dirname + '/src';
var dist = __dirname + '/dist';
var publicUrl = 'http://localhost:3000/';

module.exports = {
  devtool: 'eval',
  debug: true,
  cache: true,
  verbose: true,
  displayErrorDetails: true,
  context: __dirname,
  stats: {colors: true, reasons: true},

  devServer: {
    port: 9090,
    inline: true,
    colors: true,
    historyApiFallback: true,
    publicPath: '/dist/',
    proxy: {
      '*': 'http://localhost:3000',
    }
  },

  entry: {
    angular2: [
      'es6-shim',
      'rxjs',
      'zone.js',
      'reflect-metadata',
      'angular2/platform/browser',
      'angular2/http',
      'angular2/core',
      'angular2/router'
    ],
    vendor: [
      'lodash/index',
      'moment'
    ],
    app: ['webpack/hot/dev-server', './app/bootstrap.ts']
  },

  output: {
    publicPath: publicUrl,
    path: dist,
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json'],
    modulesDirectories: ['node_modules', 'src']
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
    ],
    //noParse: [
    //  /rtts_assert\/src\/rtts_assert/,
    //  /reflect-metadata/
    //]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // optimize chunks by occurence order
    new webpack.optimize.OccurenceOrderPlugin(),
    // optimize chunks that are duplicated
    new webpack.optimize.DedupePlugin(),
    // Generate a chunk for angular2. Ensures that no module enters in the angular chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'angular2',
      minChunks: Infinity,
      filename: 'angular2.js'
    }),
    // Generate a chunk for vendors.
    //new webpack.optimize.CommonsChunkPlugin({
    //  name: 'vendor',
    //  minChunks: Infinity,
    //  filename: 'vendor.js'
    //}),
    // Generate a chunk for common
    //new webpack.optimize.CommonsChunkPlugin({
    //  name: 'common',
    //  filename: 'common.js'
    //})
  ]
};
