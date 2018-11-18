# Notes

1. webpack打包less，使用ExtractPlugin，style-loader和postcss-loader报错

  ```javascript
  {
       test: /\.(less)/,
       use: ExtractTextPlugin.extract({
         fallback: 'style-loader',
         use: [{
             loader: 'css-loader',
             options: {
               importLoaders: 1,
               minimize: true
             },
           },
           'postcss-loader',
           {
             loader: 'less-loader',
             options: {
               lessPlugins: [
                 new LessPluginCleanCSS({
                   advanced: true,
                 }),
               ],
             },
           }
         ]
       }),
     },
  ```

  2. socket.io获取所有socket信息
  ```js
  //获取所有sockets，返回值为对象，键名为每个socket的socketid，id中不含命名空间名称，因此从namspace.adapter.clients获取的socketid需要处理
  const sockets = io.sockets.sockets;
  //遍历sockets
  for(let id in sockets){
    const ip = sockets[id].handshake.address;
  }
  ```
  3. 使用namespace.adapter.clients获取在线用户列表
  ```js
  /* nsp.adapter.clients(rooms, async (err, clients) => {
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
          userinfo: ctx.session.user,
        });
        logger.info('#online_join', clients);
      }
      //给新连接用户发送当前在线列表
      // const onlineUsers = await service.user.getConnectionInfoBySocketid(clients);
      const onlineUsers = await service.user.getConnectionInfoInRoom(room);
      socket.emit('online', {
        action: 'update',
        target: 'self',
        onlineUsers: onlineUsers,
        onlineCount: onlineUsers.length + 1,
        max: hasRoom.max,
      });
    }); */
  ```