const Service = require('egg').Service;
class ConnectionService extends Service {
  async updateConnectionInfo(options) {
    return this.ctx.model.Connection.updateOne({
      username: options.username
    }, {
      $set: {
        socketid: options.socketid,
        room: options.room
      }
    }, {
      upsert: true
    })
  }
  async countConnectedInRoom(room){
    return this.ctx.model.Connection.count({room: room});
  }
}
module.exports = ConnectionService