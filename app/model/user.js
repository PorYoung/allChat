module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    _id: {
      type: String,
      unique: true,
      alias: 'userid',
    },
    username: String,
    password: String,
    //可用ObjectId.getTimestamp()
    registerDate: String,
    lastLogin: String,
    loginDate: String,
    signature: String,
    sessionId: String,
    //增加安全提示:该用户存在同时登录冲突记录
    dangerLog: Boolean,
    avatar: String,
    //Number, {0: not connect,1: connected,2: waiting reconnecting}
    connected: {
      type: Number,
      default: 0
    },
    socketid: String,
    room: {
      type: String,
      ref: 'Room',
    },
    ipAddress: String,
  });

  return mongoose.model('User', UserSchema);
}