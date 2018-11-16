'use strict';
const path = require('path');
// const EasyWebpack = require('easywebpack-vue');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_PorYoung';

  // add your config here
  config.middleware = [];

  config.view = {
    mapping: {
      '.html': 'ejs',
    },
    defaultViewEngine: 'ejs'
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/chat',
      options: {},
    },
  };

  config.security = {
    csrf: {
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
    },
  };

  exports.io = {
    namespace: {
      // '/': {
      //   connectionMiddleware: ['auth'],
      //   packetMiddleware: ['filter'],
      // },
      '/allChat': {
        connectionMiddleware: ['auth'],
        packetMiddleware: [],
      }
    }
  };

  // config.webpack = {
  //   // port: 9000,
  //   // browser: true,
  //   webpackConfigList: [require('../build/webpack.config.js')],
  //   // webpackConfigList: EasyWebpack.getWebpackConfig('build/webpack.config.js'),
  //   hot: true
  // };
  config.appConfig = {
    defaultAvatar: '/public/image/default_avatar.jpg',
  };
  return config;
};