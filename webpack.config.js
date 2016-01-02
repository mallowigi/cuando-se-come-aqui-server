/**
 * Created by eliorb on 19/12/2015.
 */
var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');
var public = __dirname + '/public';
var app = __dirname + '/public/app';
var dist = __dirname + '/public/dist';
var publicUrl = 'http://localhost:3000/';

module.exports = {
  devtool: 'eval-source-map',
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
    hot: true,
    contentBase: public,
    publicPath: '/dist',
    proxy: {
      '*': 'http://localhost:3000'
    }
  },

  entry: {
    vendor: [
      'web-animations.min',
      path.resolve('public/app/vendor')
    ],
    app: [
      path.resolve('public/app/bootstrap')
    ]
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
    extensions: ['', '.ts', '.js', '.json', '.jade', '.html', '.scss', '.css', '.png', '.jpg'],
    modulesDirectories: ['node_modules', 'src'],
    alias: {
      angular: 'angular2/core',
      ionic: 'ionic-framework',
      'web-animations.min': path.normalize('ionic-framework/js/web-animations.min')
    }
  },

  module: {
    loaders: [
      {test: /\.html$/, loader: 'html'},
      {test: /\.jade$/, loader: 'template-html'},
      {test: /\.json$/, loader: 'json'},
      {test: /\.css$/, loader: 'raw!autoprefixer?browsers=last 2 versions'},
      {test: /\.scss$/, loader: 'raw!sass!autoprefixer?browsers=last 2 versions'},
      {test: /\.png$/, loader: "url?limit=1000000000&mimetype=images/png"},
      {
        test: /\.ts$/, loader: 'ts',
        query: {
          'ignoreDiagnostics': [],
          cacheDirectory: true,
          plugins: [
            "angular2-annotations",
            "transform-decorators-legacy",
            "transform-class-properties",
            "transform-flow-strip-types"
          ]
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
    //  /es6-shim/,
    //  /reflect-metadata/,
    //  /web-animations/,
    //  /zone\.js(\/|\\)dist(\/|\\)zone-microtask/
    //]
  },

  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    // optimize chunks by occurence order
    new webpack.optimize.OccurenceOrderPlugin(),
    // optimize chunks that are duplicated
    new webpack.optimize.DedupePlugin(),
    // Generate a chunk for angular2. Ensures that no module enters in the angular chunk
    //new webpack.optimize.CommonsChunkPlugin({
    //  name: 'angular2',
    //  minChunks: Infinity,
    //  filename: 'angular2.js'
    //})
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
