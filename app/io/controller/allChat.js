module.exports = app => {
  class allChatController extends app.Controller {
    async ping() {
      const message = this.ctx.args[0];
      await this.ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
    }
    async connection() {
      const {ctx} = this;
      console.log('connected!');
      ctx.socket.emit('hi', 'welcome');
      ctx.socket.broadcast.emit("message", "this is a message");
      // ctx.socket.on('notification', (msg) => {
      //   console.log(msg);
      //   socket.emit("notification", {
      //     status: 'ok',
      //     content: 'nothing'
      //   })
      // })
    }
  }
  return allChatController
};