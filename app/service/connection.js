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
  async countConnectedInRoom(room) {
    return this.ctx.model.Connection.count({
      room: room
    });
  }
  async getConnectionInfoBySocketid(clients) {
    /**
     * @param{Array}cliets socketid arr
     * @return{Array}onlineUsers online users' info from collection User and Connection
     */
    let onlineUsers = await this.ctx.model.Connection.find({
      socketid: {
        $in: clients
      }
    }).populate('username');
    this.logger.info(onlineUsers);
    return onlineUsers;
  }
}
module.exports = ConnectionService