'use strict';
const Controller = require('egg').Controller;
const formidable = require('formidable');
const path = require('path');

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
  async getMessage() {
    const {
      ctx,
      service,
      config
    } = this;
    const {
      page
    } = ctx.request.query;
    const messageData = await service.message.findByPagination({}, config.appConfig.messageSplitLimit, page);
    console.log(messageData);
    if (messageData && messageData.length > 0) {
      return ctx.body = messageData;
    } else {
      return ctx.body = '-1';
    }
  }

  async formParse(req, filename, config) {
    const form = new formidable.IncomingForm();
    return new Promise((resolve, reject) => {
      form.uploadDir = path.join(process.cwd(), 'app', config.appConfig.imagePublicPath);
      form.parse(req);
      form.on('fileBegin', (name, file) => {
        file.name = filename
        file.path = path.join(process.cwd(), 'app', config.appConfig.imagePublicPath, filename)
      })
      form.on('end', () => {
        resolve(path.join(config.appConfig.imagePublicPath, filename));
      })
      form.on('error', (err) => {
        reject('-1');
      })
    });
  }

  async uploadImage() {
    const {
      ctx,
      config
    } = this;
    const {
      username
    } = ctx.request.query;
    let filename = ''.concat(username, '_', new Date().getTime(), '.jpg');
    const result = await this.formParse(ctx.req, filename, config);
    return ctx.body = result;
  }
}

module.exports = allChatController;