/* globals require, module, process, __dirname */

const dotenv = require('dotenv');
const _ = require('lodash');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const varNames = _.keys(dotenv.config({ path: '.env.sample' }).parsed);

// CircleCI needs this hack to update process.env via dotenv
Object.assign(process.env, dotenv.config().parsed);
const isProduction = (process.env.ENV === 'production');
const envVars = _.mapValues(_.pick(process.env, varNames), v => JSON.stringify(v));

const config = {
  mode: process.env.ENV || 'development',
  entry: './app/scripts/main',
  output: {
    path: __dirname,
    filename: 'main.js',
  },
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': envVars,
    }),
    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/, // eslint-disable-line no-useless-escape
      /en/,
    ),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.ENV || 'development'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

if (isProduction) {
  config.plugins.push(new UglifyJSPlugin({
    sourceMap: true,
    uglifyOptions: {
      safari10: true,
      mangle: {
        safari10: true,
      },
    },
  }));
  config.plugins.push(new webpack.LoaderOptionsPlugin({
    context: __dirname,
    debug: false,
    minimize: true,
  }));
} else {
  config.plugins.push(new webpack.LoaderOptionsPlugin({
    context: __dirname,
    debug: true,
  }));
}

module.exports = config;
