module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
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
    connected:Boolean,
    connectIp: String
  });

  return mongoose.model('User', UserSchema);
}