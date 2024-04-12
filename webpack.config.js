const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[name].[contenthash].[ext]',
    clean: true
  },
  resolve:{
    extensions: ['.js']
  },
  module: {
    rules : [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/i,
        use: [ MiniCssExtractPlugin.loader,
          'css-loader']
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2)/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash][ext][query]'
        }
      }
      // {
      //   test: /\.(woff|woff2)$/,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'assets/fonts/[hash][ext][query]'
      //   }
      // }
      // {
      //   test: /\.(woff|woff2)$/,
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //       limit: 10000,
      //       mymetype: 'aplication/woff',
      //       name: '[name].[ext]',
      //       outputPath: './assets/fonts',
      //       publicPath: './assets/fonts',
      //       esModule: false
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './public/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  }
}