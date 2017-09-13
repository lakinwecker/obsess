const webpack = require("webpack");
var path = require('path');

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: __dirname + "/dist",
    filename: "obsess.js"
  },
	resolve: {
    extensions: ['.ts', '.js', '.json']
	},
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader',
        { loader: 'css-loader' },
        {
          loader: 'sass-loader?sourceMap',
          options: {
            includePaths: [
              './node_modules/bulma'
            ]
          }
        },
      ]
    },{
      test: /\.ts(x)?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              "es2016"
            ]
          }
        },
        {
          loader: 'ts-loader'
        }
      ]
    }]
  },
  plugins: [
     new webpack.WatchIgnorePlugin([ /css\.d\.ts$/ ]),
  ]
};

