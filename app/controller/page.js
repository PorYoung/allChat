'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    if (this.ctx.session.userid) {
      this.ctx.redirect('/allChat');
    } else {
      this.ctx.redirect('/login');
    }
  }

  async login() {
    if (this.ctx.session.userid) {
      return this.ctx.redirect('/allChat');
    }
    await this.ctx.render('login');
  }

  async register() {
    if (this.ctx.session.userid) {
      return this.ctx.redirect('/allChat');
    }
    await this.ctx.render('register');
  }

  async allChat() {
    let userinfo = await this.service.user.findOneByUserid(this.ctx.session.userid);
    console.log("UserInfo:", userinfo);
    await this.ctx.render('allChat', userinfo);
  }
}

module.exports = HomeController;