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
    await this.ctx.render('login');
  }

  async register() {
    await this.ctx.render('register');
  }

  async allChat() {
    let userinfo = await this.service.user.findOneByUsername(this.ctx.session.username);
    await this.ctx.render('allChat', Object.assign({}, userinfo._doc));
  }
}

module.exports = HomeController;