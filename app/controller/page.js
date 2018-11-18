'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    if (this.ctx.session.user) {
      this.ctx.redirect('/allChat');
    } else {
      this.ctx.redirect('/login');
    }
  }

  async login() {
    if (this.ctx.session.user) {
      return this.ctx.redirect('/allChat');
    }
    await this.ctx.render('login');
  }

  async register() {
    if (this.ctx.session.user) {
      return this.ctx.redirect('/allChat');
    }
    await this.ctx.render('register');
  }

  async allChat() {
    let userinfo = await this.service.user.findOneByUserid(this.ctx.session.user.userid);
    let UIBackground = Math.floor(Math.random() * 2 + 1) - 1;
    await this.ctx.render('allChat', Object.assign({
      UIBackground: UIBackground,
    }, userinfo));
  }
}

module.exports = HomeController;