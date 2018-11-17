'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const {ctx, service} = this;
    let {userid, password, rememberMe} = ctx.request.body;
    let userinfo = await service.user.findOneByUserid(userid);
    if (userinfo && userinfo.password == password) {
      ctx.session.userid = userid;
      ctx.session.username = userinfo.username;
      if (rememberMe) ctx.session.maxAge = ms('30d');
      return ctx.body = '1';
    }
    return ctx.body = '-1';
  }

  async register() {
    const {
      ctx,
      service
    } = this;
    let {
      userid,
      username,
      password
    } = ctx.request.body;
    let userinfo = await service.user.findOneByUserid(userid);
    if (userinfo) {
      return ctx.body = '-1'
    }
    if(username==null){
      username = userid;
    }
    await service.user.createUser(userid, username, password);
    ctx.session.userid = userid;
    ctx.session.username = username;
    return ctx.body = '1';
  }

  async checkUserid() {
    const {
      ctx,
      service
    } = this
    let {
      userid
    } = ctx.request.query;
    let userinfo = await service.user.findOneByUserid(userid);
    if (userinfo) {
      return ctx.body = '-1';
    }
    return ctx.body = '1';
  }
}

module.exports = UserController;