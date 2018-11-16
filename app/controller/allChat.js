'use strict';

const Controller = require('egg').Controller;

class allChatController extends Controller {
  async getUserinfo() {
    const {
      ctx,
      service
    } = this;
    if (ctx.session.username == null) {
      return ctx.body = '403 forbidden';
    }
    let userinfo = await service.user.findOneByUsername(ctx.session.username);
    if (userinfo) {
      return ctx.body = userinfo._doc;
    } else {
      return ctx.body = '-1';
    }
  }
}

module.exports = allChatController;