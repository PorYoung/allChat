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
        toType: 'room',
        date: new Date().getTime(),
      }, message));

      let room = Object.keys(socket.rooms)[0];
      message = helper.parseMsg('room_message', message);
      socket.to(room).emit('room_message', message);
    }
  }
  return allChatController
};