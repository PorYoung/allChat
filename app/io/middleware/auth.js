module.exports = app => {
  return async (ctx, next) => {
    ctx.socket.emit('connected', 'connected!');
    await next();
    // execute when disconnect.
    console.log('disconnection!');
  };
};