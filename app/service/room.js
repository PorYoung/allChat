const Service = require('egg').Service;
class RoomService extends Service {
  async getRoomInfo(options) {
    if (options.room == this.config.appConfig.defaultChatRoom) {
      return this.ctx.model.Room.findOneAndUpdate({
        room: this.config.appConfig.defaultChatRoom
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
        room: options.room,
      });
    }
  }
}
module.exports = RoomService