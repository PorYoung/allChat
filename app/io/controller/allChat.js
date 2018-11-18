module.exports = app => {
  class allChatController extends app.Controller {
    async ping() {
      const message = this.ctx.args[0];
      await this.ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
    }
    async roomMessage() {
      const {
        ctx,
        service
      } = this;
      const socket = ctx.socket;
      const helper = ctx.helper;
      let message = ctx.args[0] || {};

      //save to database
      await service.message.saveMessage(Object.assign({
        date: new Date().getTime(),
      }, message));

      let userinfo = await service.user.findOneByUserid(ctx.session.user.userid);
      message.from = {
        userid: userinfo.userid,
        username: userinfo.username,
        avatar: userinfo.avatar,
      };

      let room = Object.keys(socket.rooms)[0];
      message = helper.parseMsg('room_message', message);
      socket.to(room).emit('room_message', message);
    }
    async privateMessage() {
      const {
        ctx,
        service
      } = this;
      const socket = ctx.socket;
      const helper = ctx.helper;
      let message = ctx.args[0] || {};

      //save to database
      await service.message.saveMessage(Object.assign({
        date: new Date().getTime(),
      }, message));

      let userinfo = await service.user.findOneByUserid(ctx.session.user.userid);
      message.from = {
        userid: userinfo.userid,
        username: userinfo.username,
        avatar: userinfo.avatar,
      };
      let toUserinfo = await service.user.findOneByUserid(message.to);
      if (!toUserinfo) {
        socket.emit(socket.id, helper.parseMsg('warning', {
          type: 'warning',
          content: '该用户不见了=_=!',
        }));
      } else {
        message.to = {
          userid: toUserinfo.userid,
          username: toUserinfo.username,
          avatar: toUserinfo.avatar,
          socketid: toUserinfo.socketid,
        };
        // let room = Object.keys(socket.rooms)[0];
        let messageParsed = helper.parseMsg('private_message', message);
        socket.to(message.to.socketid).emit(message.to.socketid, messageParsed);
      }
    }
  }
  return allChatController
};