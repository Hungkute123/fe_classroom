import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
const PORT: any = process.env.PORT || 5000;
const config: webpack.Configuration = {
  entry: ['@babel/polyfill', './src/index.tsx'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg|ttf)$/i,
        loader: 'file-loader',
      },
      {
        test: [/\.js?$/, /\.ts?$/, /\.jsx?$/, /\.tsx?$/],
        use: ['source-map-loader'],
        enforce: 'pre',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
  },
  devServer: {
    compress: true,
    port: PORT,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      // favicon: path.join(__dirname, 'public/assets'),
    }),
    new Dotenv({
      path: './.env',
      safe: true,
      allowEmptyValues: true,
      systemvars: true,
      silent: true,
      defaults: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'public/[name].css',
      chunkFilename: '[id].css',
    }),
    
  ],
};
export default config;
