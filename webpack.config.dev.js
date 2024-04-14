const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

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
    extensions: ['.js'],
    alias:{
      "@utils": path.resolve(__dirname, 'src/utils'),
      "@images": path.resolve(__dirname, 'src/assets/images'),
      "@templates": path.resolve(__dirname, 'src/templates'),
      "@styles": path.resolve(__dirname, 'src/styles')
    }
  },
  mode: 'development',
  devtool: 'source-map',
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
    }),
    new Dotenv(),
    new BundleAnalyzerPlugin()
  ],
  devServer:{
    static:path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 8080,
    open: true
  }
}