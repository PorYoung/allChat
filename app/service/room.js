const Service = require('egg').Service;
class RoomService extends Service {
  async getRoomInfo(options) {
    if (options._id == this.config.appConfig.defaultChatRoom) {
      return this.ctx.model.Room.findOneAndUpdate({
        _id: this.config.appConfig.defaultChatRoom
      }, {
        $set: {
          max: this.config.appConfig.defaultChatRoomMax
        }
      }, {
        new: true,
        upsert: true
      });
    } else {
      return this.ctx.model.Room.findOne({
        _id: options._id,
      });
    }
  }
}
module.exports = RoomService