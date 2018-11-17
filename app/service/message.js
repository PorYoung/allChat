const Service = require('egg').Service;
class MessageService extends Service {
  async saveMessage(msg) {
    return this.ctx.model.Message.create(Object.assign({}, msg));
  }
  async findByPagination(criterion, limit, page) {
    const total = await this.ctx.model.Message.count(criterion);
    const totalPageNum = parseInt(total / limit);
    if (page > totalPageNum) {
      return null;
    }
    const start = limit * page;
    return this.ctx.model.Message
      .where(criterion)
      .sort({
        date: -1
      })
      .limit(limit)
      .skip(start)
  }
}
module.exports = MessageService