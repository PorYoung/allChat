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
    if (ctx.session.user == null) {
      return ctx.body = '403 forbidden';
    }
    let {
      room
    } = ctx.request.query;
    let userinfo = await service.user.findOneByUserid(ctx.session.user.userid);
    if (userinfo) {
      Object.assign(ctx.session.user, userinfo, {
        ipAddress: ctx.request.ip,
        room: room,
      });
      return ctx.body = Object.assign(userinfo, {
        ipAddress: ctx.request.ip,
      });
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
    const messageData = await service.message.findByPagination({
      $or: [{
        $and: [{
          toType: 'room'
        }, {
          room: ctx.session.user.room
        }]
      }, {
        to: ctx.session.user.userid
      }, {
        from: ctx.session.user.userid
      }]
    }, config.appConfig.messageSplitLimit, page);
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
      userid
    } = ctx.request.query;
    let filename = ''.concat(userid, '_', new Date().getTime(), '.jpg');
    const result = await this.formParse(ctx.req, filename, config);
    return ctx.body = result;
  }
}

module.exports = allChatController;