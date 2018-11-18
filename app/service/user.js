const Service = require('egg').Service;
class UserService extends Service {
  async findOneByUserid(userid) {
    let docs = await this.ctx.model.User.findOne({
      _id: userid,
    });
    if (docs) {
      return docs.toObject({
        virtuals: true
      });
    }
    return docs;
  }
  async findOneByUsername(username) {
    let docs = await this.ctx.model.User.findOne({
      username: username,
    });
    if (docs) {
      return docs.toObject({
        virtuals: true
      });
    }
    return docs;
  }

  async createUser(userid, username, password) {
    let {
      ctx,
      config
    } = this;
    let registerDate = new Date().getTime();
    let defaultAvatarArr = config.appConfig.defaultAvatarArr;
    let defaultAvatar = defaultAvatarArr[Math.floor(Math.random() * defaultAvatarArr.length + 1) - 1];
    let user = await ctx.model.User.create({
      _id: userid,
      username: username,
      password: password,
      registerDate: registerDate,
      loginDate: registerDate,
      avatar: defaultAvatar,
      connected: 1,
      ipAddress: ctx.request.ip,
    });
    if (user) {
      return user.toObject({
        virtuals: true
      });
    }
    return user;
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
        room: options.room,
        connected: options.connected,
        ipAddress: options.ipAddress,
      },
    }, {
      upsert: true
    });
  }

  async updateUserIPAddress(options) {
    let docs = await this.ctx.model.User.findOneAndUpdate({
      _id: options.userid
    }, {
      $set: {
        ipAddress: options.ipAddress,
      },
    }, {
      new: true
    });
    if (docs) {
      return docs.toObject({
        virtuals: true
      });
    }
    return docs;
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
    })
    return onlineUsers;
  }
  async getConnectionInfoInRoom(room) {
    let queryArr = await this.ctx.model.User.find({
      connected: {
        $ne: 0
      },
      room: room,
    });
    let onlineUsers = [];
    queryArr.forEach((doc) => {
      onlineUsers.push(doc.toObject({
        virtuals: true
      }));
    })
    return onlineUsers;
  }
}
module.exports = UserService