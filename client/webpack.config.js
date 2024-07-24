const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'TODOs List'
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
        // TODO: Create a manifest.json:
        
          short_name: 'textEditor',
          name: 'Text-Editor',
          orientation: 'portrait',
          display: 'standalone',
          start_url: './',
          description: 'A Progressive Web App',
          background_color: '#404040',
          icons: [
              {
                  src: path.resolve('src/images/logo.png'),
                  sizes:[96, 128, 192],
                  destination: path.join('src', 'icons'),
              },
          ],
      
      }),
    ],

    module: {
      rules: [
        {
          test: /\.html$/,
          use: ['html-loader'] // Use html-loader to handle HTML files
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
