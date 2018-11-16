const Service = require('egg').Service;
class UserService extends Service {
  async findOneByUsername(username) {
    return this.ctx.model.User.findOne({
      username: username
    });
  }

  async createUser(username, password) {
    let {
      ctx,
      config
    } = this;
    let registerDate = new Date().getTime();
    let defaultAvatar = config.appConfig.defaultAvatar;
    return ctx.model.User.create({
      username: username,
      password: password,
      registerDate: registerDate,
      loginDate: registerDate,
      avatar: defaultAvatar,
      connected: true,
      connectIp: ctx.request.ip,
    });
  }
}
module.exports = UserService