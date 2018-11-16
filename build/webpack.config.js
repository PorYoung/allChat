const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const staticPath = path.resolve(process.cwd(), 'app/public/dist');
const publicPath = '/public/dist/';
const pathResolve = (p) => {
  return path.resolve(process.cwd(), 'build', p);
};
module.exports = {
  devtool: 'eval-source-map',
  entry: {
    login: pathResolve('src/component/login/login.js'),
    register: pathResolve('src/component/register/register.js'),
    allChat: pathResolve('src/component/allChat/allChat.js'),
  },
  mode: 'none',

  output: {
    publicPath: publicPath,
    path: staticPath,
    filename: 'js/[name].[hash].bundle.js',
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: "common",
          chunks: "all",
          minSize: 1,
          priority: 0,
          minChunks: 2,
        },
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        }
      }
    },
    // minimizer: [new UglifyJsPlugin()]
  },

  module: {
    rules: [{
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        }),
      },
      {
        test: /\.(less)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                alias: {
                  '@': path.resolve(staticPath, 'image') // '~@/logo.png' 这种写法，会去找src/img/logo.png这个文件
                }
              },
            },
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                lessPlugins: [
                  new LessPluginCleanCSS({
                    advanced: true,
                  }),
                ],
              },
            }
          ]
        }),
      },
      {
        // test: /\.(eot|svg|ttf|woff|woff2|png)\w*/,
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'font/[name].[hash].[ext]',
            publicPath: publicPath,
          },
        }],
      },
      {
        test: /\.(png|jpg|gif)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 4096, // 把小于50000 byte的文件打包成Base64的格式写入JS
            name: 'image/[name].[hash].[ext]',
            publicPath: publicPath,
          },
        }],
      },
      {
        test: /\.(htm|html)$/,
        use: {
          loader: 'html-loader',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Login',
      template: pathResolve('src/component/login/login.html'),
      //指定页面需要的模块
      chunks: ['vendors', 'common', 'login'],
      filename: path.resolve(process.cwd(), 'app/view/login.html')
    }),
    new HtmlWebpackPlugin({
      title: 'Register',
      template: pathResolve('src/component/register/register.html'),
      //指定页面需要的模块
      chunks: ['vendors', 'common', 'register'],
      filename: path.resolve(process.cwd(), 'app/view/register.html')
    }),
    new HtmlWebpackPlugin({
      title: 'allChat',
      template: pathResolve('src/component/allChat/allChat.html'),
      //指定页面需要的模块
      chunks: ['vendors', 'common', 'allChat'],
      filename: path.resolve(process.cwd(), 'app/view/allChat.html')
    }),
    new cleanWebpackPlugin([staticPath, path.resolve(process.cwd(), 'app/view')], {
      root: process.cwd(),
      verbose: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].bundle-[hash].css',
    }),
    new webpack.ProvidePlugin({
      "$": "jquery",
      "jQuery": "jquery",
      "window.jQuery": "jquery"
    }),
  ],
};