module.exports = app => {
  return async (ctx, next) => {
    if(ctx.session.username){
      next();
    }else{
      return ctx.body = '403 forbidden';
    }
  };
};