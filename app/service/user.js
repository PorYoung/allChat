const Service = require('egg').Service;
class UserService extends Service {
  async findOneByUserid(userid) {
    let docs = await this.ctx.model.User.findOne({
      _id: userid,
    });
    return docs.toObject({
      virtuals: true
    });
  }
  async findOneByUsername(username) {
    let docs = await this.ctx.model.User.findOne({
      username: username,
    });
    return docs.toObject({
      virtuals: true
    });
  }

  async createUser(userid, username, password) {
    let {
      ctx,
      config
    } = this;
    let registerDate = new Date().getTime();
    let defaultAvatar = config.appConfig.defaultAvatar;
    return ctx.model.User.create({
      _id: userid,
      username: username,
      password: password,
      registerDate: registerDate,
      loginDate: registerDate,
      avatar: defaultAvatar,
      connected: true,
    });
  }

  async countConnectedInRoom(roomid) {
    return this.ctx.model.User.count({
      room: roomid,
      connected: true,
    });
  }

  async updateConnectionInfo(options) {
    return this.ctx.model.User.updateOne({
      _id: options.userid
    }, {
      $set: {
        socketid: options.socketid,
        room: options.room
      }
    }, {
      upsert: true
    });
  }

  async getConnectionInfoBySocketid(clients) {
    /**
     * @param{Array}cliets socketid arr
     * @return{Array}onlineUsers online users' info from collection User and Connection
     */
    let queryArr = await this.ctx.model.User.find({
      socketid: {
        $in: clients
      }
    });
    let onlineUsers = [];
    queryArr.forEach((doc) => {
      onlineUsers.push(doc.toObject({
        virtuals: true
      }));
    });
    return onlineUsers;
  }
}
module.exports = UserService