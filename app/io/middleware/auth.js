let timer = null;
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
    if (ctx.session.user == null) {
      return;
    }

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
    };
    // 检查房间是否存在，不存在则踢出用户
    const hasRoom = await service.room.getRoomInfo({
      _id: room
    });
    const onlineCount = await service.user.countConnectedInRoom(room);
    logger.info('#has_room_exist', hasRoom);
    logger.info('#people_in_room', onlineCount);
    if (!hasRoom) {
      tick(sid, {
        type: 'room_not_exist',
        message: 'deleted, room has been deleted.',
      });
      return;
    }
    // 检查房间是否已满，已满则踢出用户
    else if (onlineCount >= hasRoom.max) {
      tick(sid, {
        type: 'room_is_full',
        message: 'error, room{' + room + '} is full.'
      });
      return;
    }

    // 用户加入房间
    logger.info('#join', room);
    socket.join(room);

    //检查用户连接状态，重连状态不通知在线用户，不更新在线列表
    let queryInfo = await service.user.findOneByUserid(ctx.session.user.userid);
    if (!queryInfo) {
      logger.error('user has been removed from database');
    }
    let connected = queryInfo.connected;
    //在线列表
    if (connected != 2) {
      //给新连接用户发送欢迎信息
      socket.emit(sid, helper.parseMsg('welcome', {
        type: 'welcome',
        content: `欢迎来到allChat聊天室，您所在的房间是：${room}.`,
      }));
      nsp.to(room).emit('online', {
        action: 'join',
        target: 'onlineUsers',
        message: `User(${ctx.session.user.userid}) joined.`,
        userinfo: Object.assign(ctx.session.user, {
          socketid: sid,
          room: room,
          connected: 1,
          ipAddress: helper.parseIPAddress(socket.handshake.address),
        }),
      });
      logger.info('#online_join', sid);
    }
    //更新连接状态
    await service.user.updateConnectionInfo({
      userid: ctx.session.user.userid,
      socketid: sid,
      room: room,
      connected: 1,
      ipAddress: helper.parseIPAddress(socket.handshake.address),
    });
    //清除离开状态定时判断
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    //给新连接用户发送当前在线列表
    const onlineUsers = await service.user.getConnectionInfoInRoom(room);
    socket.emit('online', {
      action: 'update',
      target: 'self',
      onlineUsers: onlineUsers,
      onlineCount: onlineUsers.length + 1,
      max: hasRoom.max,
    });
    await next();

    //断线一定时间内判断为刷新事件，不触发离开事件
    await service.user.updateConnectionInfo({
      userid: ctx.session.user.userid,
      socketid: null,
      room: room,
      connected: 2,
    });
    timer = setTimeout(async () => {
      let userinfo = await service.user.findOneByUserid(ctx.session.user.userid);
      if (!userinfo) {
        logger.error('user has been removed from database');
      }
      let connectionState = userinfo.connected;
      // console.log('shedule connected state:', connectionState);
      if (connectionState == 1) {
        //刷新操作，不触发离开事件
        return;
      } else if (connectionState == 2) {
        //超时，触发离开事件
      } else {
        //已断线，触发离开事件
      }
      // execute when disconnect.
      // 用户离开
      logger.info('#leave', room);

      // 在线列表
      nsp.adapter.clients(rooms, (err, clients) => {
        logger.info('#online_leave', clients);

        // 更新在线用户列表
        nsp.to(room).emit('online', {
          action: 'leave',
          target: 'participator',
          message: `User(${ctx.session.user.userid}) leave.`,
          userinfo: Object.assign(ctx.session.user, {
            socketid: sid,
            room: room,
            connected: 0,
            ipAddress: helper.parseIPAddress(socket.handshake.address),
          }),
        });
      });
      await service.user.updateConnectionInfo({
        userid: ctx.session.user.userid,
        socketid: null,
        room: room,
        connected: 0,
      });
      logger.info(`User(${ctx.session.user.userid}) disconnection!`);
    }, app.config.appConfig.allowReconnectionTime);
  };
};