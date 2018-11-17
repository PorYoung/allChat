'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
    io,
    middleware
  } = app;
  router.get('/', controller.page.index);
  router.get('/login', controller.page.login);
  router.get('/register', controller.page.register)
  router.get('/register/checkUserid', controller.user.checkUserid);
  router.get('/allChat', controller.page.allChat);
  router.get('/allChat/getUserinfo', controller.allChat.getUserinfo);
  router.get('/allChat/getMessage', controller.allChat.getMessage);

  router.post('/login', controller.user.login);
  router.post('/register', controller.user.register);
  router.post('/allChat/uploadImage', controller.allChat.uploadImage);

  global.allChat = io.of('/allChat');
  allChat.route('allChat', io.controller.allChat.ping);
  allChat.route('connection', io.controller.allChat.connection);
  allChat.route('room_message', io.controller.allChat.roomMessage);
};