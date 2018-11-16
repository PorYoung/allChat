'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const {ctx, service} = this;
    let {username, password} = ctx.request.body;
    let userinfo = await service.user.findOneByUsername(username);
    if(userinfo){
      ctx.session.username = username;
      return ctx.body = '1';
    }
    return ctx.body = '-1';
  }

  async register(){
    const {ctx, service} = this;
    let {username, password} = ctx.request.body;
    let userinfo = await service.user.findOneByUsername(username);
    if(userinfo){
      return ctx.body = '-1'
    }
    await service.user.createUser(username, password);
    ctx.session.username = username;
    return ctx.body = '1';
  }

  async checkUsername(){
    const {ctx, service} = this
    let {username} = ctx.request.query;
    let userinfo = await service.user.findOneByUsername(username);
    if(userinfo){
      return ctx.body = '-1';
    }
    return ctx.body = '1';
  }
}

module.exports = UserController;