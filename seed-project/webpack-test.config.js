const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = (env) => {

  const outputFile = path.resolve(__dirname, './dist/tests/testBundle.js');
  const buildCmd = 'mocha -w ' + outputFile;

  return {
    entry: './tests/helpers/browser.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'tests/testBundle.js'
    },
    target: 'node',
    externals: [
      nodeExternals()
    ],
    node: {
      fs: 'empty'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /(node_modules|bower_components)/,
          query: {compact: false}
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
          query: {compact: false}
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          query: {
            "presets": [
              ["es2015"],
              "stage-0",
              "react"
            ],
            "plugins": [
              "react-hot-loader/babel"
            ],
            compact: false
          },

          exclude: [
            /node_modules/,
          ],
        },
        {test: /\.json$/, loader: "json-loader"},
        {
          test: /\.(jpe?g|png|gif)$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [
      new WebpackShellPlugin({
        onBuildExit: buildCmd
      })
    ]
  }
}