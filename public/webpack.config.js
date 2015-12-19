/**
 * Created by eliorb on 19/12/2015.
 */
module.exports = {
  entry: './app/main.ts',
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/, loader: 'ts-loader'
      }
    ]
  }
};
