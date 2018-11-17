module.exports = () => {
  return async (ctx, next) => {
    const {
      app,
      socket,
      logger,
      helper,
      service
    } = ctx;
    const sid = socket.id;
    const nsp = app.io.of('/allChat');
    const query = socket.handshake.query;

    // 用户信息
    const {
      room
    } = query;
    const rooms = [room];

    logger.info('#user_info', sid, room);

    const tick = (sid, msg) => {
      logger.info('#tick', sid, msg);

      // 踢出用户前发送消息
      socket.emit(sid, helper.parseMsg('deny', msg));

      // 调用 adapter 方法踢出用户，客户端触发 disconnect 事件
      // nsp.adapter.remoteDisconnect(sid, true, err => {
      //   logger.error(err);
      // });
      // socket.disconnect(true);
    };
    // 检查房间是否存在，不存在则踢出用户
    const hasRoom = await service.room.getRoomInfo({
      room: room
    });
    const countInRoom = await service.connection.countConnectedInRoom(room);
    console.warn('count:', countInRoom);
    logger.info('#has_room_exist', hasRoom);
    logger.info('#people_in_room', countInRoom);
    if (!hasRoom) {
      tick(sid, {
        type: 'room_not_exist',
        message: 'deleted, room has been deleted.',
      });
      return;
    }
    // 检查房间是否已满，已满则踢出用户
    else if (countInRoom >= hasRoom.max) {
      tick(sid, {
        type: 'room_is_full',
        message: 'error, room{' + room + '} is full.'
      });
      return;
    }

    // 用户加入房间
    logger.info('#join', room);
    socket.join(room);
    await ctx.service.connection.updateConnectionInfo({
      username: ctx.session.username,
      socketid: sid,
      room: room,
    });

    //通知该room中的在线用户
    nsp.to(room).emit('info', helper.parseMsg('info', {
      type: 'welcome',
      content: `用户${ctx.session.username}加入了聊天室.`,
    }));
    // 在线列表
    nsp.adapter.clients(rooms, (err, clients) => {
      logger.info('#online_join', clients);

      // 更新在线用户列表
      nsp.to(room).emit('online', {
        clients,
        action: 'join',
        target: 'participator',
        message: `User(${ctx.session.username}) joined.`,
      });
    });

    await next();
    // execute when disconnect.
    // 用户离开
    logger.info('#leave', room);

    // 在线列表
    nsp.adapter.clients(rooms, (err, clients) => {
      logger.info('#online_leave', clients);

      // 获取 client 信息
      // const clientsDetail = {};
      // clients.forEach(client => {
      //   const _client = app.io.sockets.sockets[client];
      //   const _query = _client.handshake.query;
      //   clientsDetail[client] = _query;
      // });

      // 更新在线用户列表
      nsp.to(room).emit('online', {
        clients,
        action: 'leave',
        target: 'participator',
        message: `User(${ctx.session.username}) leaved.`,
      });
    });
    console.log('disconnection!');
  };
};