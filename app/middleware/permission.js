const URL = require('url');
module.exports = (options, app) => {
  return async (ctx, next) => {
    const {
      url,
      method
    } = ctx.request;
    const excludeUrl = options.excludeUrl;
    const pathname = URL.parse(url).pathname;
    if (excludeUrl['ALL'].includes(pathname)) {
      await next();
    } else if (method.toUpperCase() == 'POST' && excludeUrl['POST'].includes(pathname)) {
      await next();
    } else if (method.toUpperCase() == 'GET' && excludeUrl['GET'].includes(pathname)) {
      await next();
    } else {
      let userinfo = ctx.session.user;
      if (userinfo == null) {
        ctx.status = 403;
        ctx.body = 'Permission Forbidden';
      } else {
        let user = await ctx.service.user.updateUserIPAddress({
          userid: userinfo.userid,
          ipAddress: ctx.request.ip,
        });
        ctx.session.user = user;
        await next();
      }
    }
  }
}