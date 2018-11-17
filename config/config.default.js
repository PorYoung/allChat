'use strict';
const path = require('path');
// const EasyWebpack = require('easywebpack-vue');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_PorYoung';

  // add your config here
  config.middleware = ['permission'];

  config.permission = {
    excludeUrl: {
      'ALL': ['/', '/login', '/register'],
      'POST': [],
      'GET': ['/register/checkUserid'],
    },
  };

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

  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true,
  };

  config.io = {
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
    imagePublicPath: '/public/image',
    defaultChatRoom: 'default',
    defaultChatRoomMax: 999,
    messageSplitLimit: 8,
  };
  config.logger = {
    level: 'DEBUG',
  };
  return config;
};