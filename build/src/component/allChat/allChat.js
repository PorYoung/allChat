import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../lib/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../lib/csrfAjax';
import './allChat.less';
// var $ = require('jquery');
const config = {
  userinfo: {},
  socket: {
    room: 'default',
    onlineCount: 0,
    max: 999,
    id: null,
  },
};
const socketClient = require('socket.io-client');
const allChat = socketClient('http://10.129.13.253:7001/allChat', {
  query: {
    room: config.socket.room,
  },

  transports: ['websocket'],
});

//修改模板冲突
_.templateSettings = {
  evaluate: /\<\{(.+?)\}\>/g,
  interpolate: /\<\{=(.+?)\}\>/g
};

//定义函数：私发事件，将占位符添加到输入框
//安全问题：需要对各id做合法性判断
// <\/input>
const privateMessageReg = new RegExp(/<input id=\"privatePlaceHolder\".*(data-userid).*(data-username).*(data-socketid)(([\s\S])*?)>/);
const sendPrivateMessage = function () {
  let ele = $(this);
  let socketid = ele.data('socketid');
  let userid = ele.data('userid');
  let username = ele.data('username');
  if ($('#privatePlaceHolder')[0]) {
    $('#privatePlaceHolder').remove();
  }
  let html = $("#inputText").html();
  $("#inputText").html('').focus().html(`<input id="privatePlaceHolder" data-userid="${userid}" data-username="${username}" data-socketid="${socketid}" value="To ${username} [ID:${userid}]:" disabled>`.concat(html));
}

//定义函数：显示通知框
var showNotification = function showNotification(text) {
  $('#notification').html(text).show('fast');
  setTimeout(function () {
    $('#notification').html('').hide('fast');
  }, 3000);
}

//定义行数：显示系统提示
const infoBoxCompiled = (info, boxStyle = 'mini') => {
  let infoBox = '';
  if (boxStyle == 'mini') {
    infoBox = `<div class="message-info-mini"><div class="content"><{= info.content }></div></div>`;
  } else if (boxStyle == 'Warning') {
    infoBox = `<div class="message-info WarningInfo" id="first"><div class="message-info-arrow"></div><div class="titleContainer"><h3><{= info.type }></h3></div><div class="mainContainer"><p><{= info.content }></p></div></div>`;
  } else {
    infoBox = `<div class="message-info" id="first"><div class="message-info-arrow"></div><div class="titleContainer"><h3><{= info.type }></h3></div><div class="mainContainer"><p><{= info.content }></p></div></div>`;
  }
  let compiled = _.template(infoBox);
  compiled = compiled({
    info,
  });
  $("#listPanel").append(compiled);
};

//定义函数：使用消息模板
var messageBoxCompiled = function messageBoxCompiled(msg, position = "left", insertTo = "append") {
  /*  var messageBox = !!msg.type && msg.type == "image" ? '<div class="message-list message-list-left"><img src="<{= msg.avatar }>" class="avatar"/><em class="list-group-item-heading"><{= msg.from.username }></em> <div class="list-group-item"> <i style="position: absolute" class="fa fa-menu-left"></i><p class="list-group-item-text"><img src="<{= msg.mediaId }>" data-imgurl="<{= msg.mediaId }>" class="weixinServerImage weixinServerImageActive"></p></div></div>' : '<div class="message-list message-list-left"><img src="<{= msg.avatar }>" class="avatar"/><em class="list-group-item-heading"><{= msg.from.username }></em> <div class="list-group-item"> <i style="position: absolute" class="fa fa-menu-left"></i> <p class="list-group-item-text"><{= msg.content }></p></div></div>' */
  var messageBox = '<div class="message-list message-list-left"><div class="list-group-header" title="<{= msg.from.userid }>"><img src="<{= msg.from.avatar }>" class="avatar"/><em class="list-group-item-heading"><{= msg.from.username }></em> </div> <div class="list-group-item"> <i style="position: absolute" class="fa fa-menu-left"></i> <p class="list-group-item-text"><{= msg.content }></p></div></div>';
  if (msg.to) {
    var messageBox = '<div class="message-list message-list-left"><div class="list-group-header" title="<{= msg.from.userid }>"><img src="<{= msg.from.avatar }>" class="avatar"/><em class="list-group-item-heading"><{= msg.from.username }></em> </div> <div class="list-group-item"> <i style="position: absolute" class="fa fa-menu-left"></i> <p class="list-group-item-text"><input class="privateMessageTip" value="To <{= msg.to.username }> [ID:<{= msg.to.userid }>]:" disabled><br><{= msg.content }></p></div></div>';
  }
  // <input id="privatePlaceHolder" data-userid="${userid}" data-username="${username}" data-socketid="${socketid}" value="To ${username} [ID:${userid}]:" disabled></input>
  if (position === "right") {
    //右
    messageBox = messageBox.replace(/left/g, "right").replace(/(<img.+\/>)(<em.+<\/em>)/, "$2$1");
  }
  var compiled = _.template(messageBox);
  compiled = compiled({
    msg,
  });
  if (insertTo == 'prepend') {
    $("#listPanel").prepend(compiled);
  } else {
    $("#listPanel").append(compiled);
  }
};

//消息页面滚动
const scrollToBottom = () => {
  let scrollHeight = $("#listPanel")[0].scrollHeight - $("#listPanel")[0].clientHeight;
  $("#listPanel").animate({
    scrollTop: scrollHeight
  }, 300);
};

//parse socket message recieved
var getPayloadFromMsg = (msg) => {
  return msg.data.payload;
};

const roomOnlineUserBoxTemplate = (userinfo) => {
  let userDetailBox = `
    <div class="user-content-userid">
      <span class="fa fa-user-circle-o" title="UserID"></span><i>${userinfo.userid}</i>
    </div>
    <div class="user-content-ipAdress">
      <span class="fa fa-map-marker" title="IP Address"></span><i>${userinfo.ipAddress}</i>
    </div>`
  if (userinfo.userid != config.userinfo.userid) {
    // onclick="sendPrivateMessage();"
    userDetailBox = userDetailBox.concat(`
    <div class="sendPrivateMessageBtn" id="sendPrivateMessageBtn-${userinfo.userid}" data-username="${userinfo.username}" data-userid="${userinfo.userid}" data-socketid="${userinfo.socketid}"} >
      <span class="fa fa-commenting-o" title="发私信"></span><i>发私信</i>
    </div>`);
  }
  let userBox =
    `<div class="card user-list-item" data-socktid="${userinfo.socketid}" data-userid="${userinfo.userid}">
    <div class="card-header user-list-header" id="user-${userinfo.userid}-btn">
      <img src="${userinfo.avatar}" class="user-list-avatar">
      <button class="btn btn-link user-list-username" data-toggle="collapse" data-target="#user-${userinfo.userid}-content" aria-expanded="true" aria-controls="user-${userinfo.userid}-content">
          ${userinfo.username}
      </button>
    </div>
    <div id="user-${userinfo.userid}-content" class="user-list-content collapse ${userinfo.show?'show':''}" aria-labelledby="user-${userinfo.userid}-btn" data-parent="${userinfo.collapseParent||''}">
        <div class="card-body" id="user-${userinfo.userid}-list">
            ${userDetailBox}
        </div>
    </div>
  </div>`
  return userBox;
}
//手风琴一级菜单模板
const roomCardBoxCompiled = (cardinfo) => {
  let users = cardinfo.onlineUsers;
  let onlineUserBoxs = [];
  users.forEach((user) => {
    onlineUserBoxs.push(roomOnlineUserBoxTemplate(user));
  });
  let cardBox =
    `<div class="card" id="room-${cardinfo.room}">
    <div class="card-header" id="room-${cardinfo.room}-btn">
        <h5 class="mb-0">
            <button class="btn btn-link" data-toggle="collapse" data-target="#room-${cardinfo.room}-content" aria-expanded="true"
                aria-controls="room-${cardinfo.room}-content">
                ${cardinfo.room}
            </button>
            <i class="card-tips room-online-count" data-room="${cardinfo.room}">${cardinfo.onlineCount}</i>
             / 
            <i class="card-tips room-online-max" data-room="${cardinfo.room}">${cardinfo.max}</i>
        </h5>
    </div>

    <div id="room-${cardinfo.room}-content" class="collapse ${cardinfo.show?'show':''}" aria-labelledby="room-${cardinfo.room}-btn" data-parent="${cardinfo.collapseParent||''}">
        <div class="card-body" id="room-${cardinfo.room}-list">
            ${onlineUserBoxs.join('')}
        </div>
    </div>
  </div>`;
  let compiled = _.template(cardBox);
  compiled = compiled({
    cardinfo,
  });
  if ($(`#room-${cardinfo.room}`)[0]) {
    $(`#room-${cardinfo.room}`).replaceWith(compiled);
  } else {
    $("#accordion").append(compiled);
  }
  //绑定发送私信事件
  $('.sendPrivateMessageBtn').off().on('click', sendPrivateMessage);
};
//二级菜单模板-在线用户列表
const roomOnlineUserBoxCompiled = (userinfo) => {
  let userBox = roomOnlineUserBoxTemplate(userinfo);
  let compiled = _.template(userBox);
  compiled = compiled({
    userinfo,
  });
  if ($(`.user-list-item[data-userid="${userinfo.userid}"]`)[0]) {
    $(`.user-list-item[data-userid="${userinfo.userid}"]`).replaceWith(compiled);
  } else {
    $(`#room-${userinfo.room}-list`).append(compiled);
  }
  //绑定事件
  $(`.sendPrivateMessageBtn[id="sendPrivateMessageBtn-${userinfo.userid}"]`).off().on('click', sendPrivateMessage);
}

//get user info
$.get('/allChat/getUserinfo?room=' + config.socket.room, (data) => {
  if (data && data != -1) {
    Object.assign(config.userinfo, data);
    //get history message
    //读取allChat消息
    //0未加载 1加载完成 2无更多消息
    var loadMessageFlag = 0;
    //定义函数：加载消息
    function loadMessage(page, callback) {
      $.get("/allChat/getMessage", {
        "page": page,
      }, function (data) {
        if (data == "-1") {
          loadMessageFlag = 2;
        } else {
          data.forEach((msg) => {
            if (msg.from.userid == config.userinfo.userid) {
              messageBoxCompiled(msg, 'right', 'prepend');
            } else {
              messageBoxCompiled(msg, 'left', 'prepend');
            }
          })
          /*  var compiled = _.template($("#message-template").html());
           $("#listPanel").prepend(compiled({
             data
           })); */
          loadMessageFlag = 1;
        }
        callback && callback();
      })
    }
    //初始化读取第page=0页
    var page = 0;
    loadMessage(page, function () {
      loadMessageFlag = 0;
      scrollToBottom();
    });
    //定义函数：touch事件
    var myTouchEvent = function () {
      var swip_time = 300,
        swip_dis = 30,
        point_start,
        point_end,
        time_start,
        time_end,
        //1 上 2 右 3 下 4左
        result;
      if ("ontouchstart" in window) {
        var startEvt = "touchstart",
          moveEvt = "touchmove",
          endEvt = "touchend";
      } else {
        var startEvt = "mousedown",
          moveEvt = "mousemove",
          endEvt = "mouseup";
      }
      var getPos = function (e) {
        var touches = e.touches;
        if (touches && touches[0]) {
          return {
            x: touches[0].clientX,
            y: touches[0].clientY
          };
        }
        return {
          x: e.clientX,
          y: e.clientY
        };
      }
      var getDistance = function (p1, p2) {
        return parseInt(Math.sqrt(Math.pow(Math.abs(p1.x - p2.x), 2) + Math.pow(Math.abs(p1.y - p2.y), 2)));
      }
      var getDirection = function (p1, p2) {
        var angle = Math.atan2(p1.y - p2.y, p2.x - p1.x) * 180 / Math.PI;
        if (angle <= 45 && angle >= -45) return "right";
        if (angle >= 45 && angle <= 135) return "up";
        if (angle >= 135 || angle <= -135) return "left";
        if (angle <= -45 && angle >= -135) return "down";
      }
      var startEvtHandle = function (e) {
        var pos = getPos(e);
        var touches = e.touches;
        if (!touches || touches.length == 1) {
          point_start = getPos(e);
          time_start = new Date().getTime();
        }
        //显示刷新图标
        $("#notification").css({
          height: 0,
          overflow: "hidden"
        }).html("<i class='fa fa-spinner fa-pulse fa-2x fa-fw'></i><span class='sr-only'>释放加载更多</span>").show();
        point_end = pos;
      }
      var transformYPre = 0;
      var moveEvtHandle = function (e) {
        point_end = getPos(e);
        var y = point_end.y - point_start.y;
        if (y > 0 && y > 80) {
          y = 80;
        } else if (y < 0) {
          y = 0;
        }
        transformYPre += y - transformYPre;
        $("#listPanel").css({
          transition: "all 1s",
          transform: "translate3d(0," + transformYPre + "px,0)"
        })
        $("#notification").css({
          transition: "all 1s",
          height: transformYPre + "px",
          lineHeight: transformYPre + "px"
        })
        e.preventDefault();
      }
      var endEvtHandle = function (e) {
        time_end = new Date().getTime();
        var dis = getDistance(point_start, point_end);
        var time = time_end - time_start;
        //构成滑动事件
        if (dis >= swip_dis && time >= swip_time) {
          var dir = getDirection(point_start, point_end),
            disY = point_end.y - point_start.y,
            disX = point_end.x - point_start.x;
          if (disY >= 80 && dir == "down") {
            result = 3;
            //下拉行为有效
            loadMessage(++page);
            console.log('加载中');
            //加载完成后释放 等待30s
            var timer = setInterval(function () {
              if (loadMessageFlag) {
                $("#listPanel").css({
                  transition: "all 1s",
                  transform: "translate3d(0,0,0)"
                })
                //显示加载成功
                if (loadMessageFlag == 1) $("#notification").html("<i class='fa fa-check-circle-o fa-2x fa-fw' style='color: #00EE00'></i><span class='sr-only'>Success</span>");
                else if (loadMessageFlag == 2) $("#notification").html("没有更多消息了=_=");
                loadMessageFlag = 0;
                setTimeout(function () {
                  $("#notification").css({
                    height: "30px",
                    lineHeight: "30px"
                  }).html("").hide();
                  clearInterval(timer);
                }, 300);
              }
            });
            //30s后停止
            setTimeout(function () {
              clearInterval(timer);
              //显示加载失败
              $("#notification").html("<i class='fa fa-remove fa-4x fa-fw' style='color: #00EE00'></i><span class='sr-only'>Failed</span>");
              loadMessageFlag = false;
              setTimeout(function () {
                $("#notification").css({
                  height: "30px",
                  lineHeight: "30px"
                }).html("").hide();
              }, 300);
            }, 31000);
          } else if (disX >= 80 && dir == "right") {
            result = 2;
          } else if (disX < -30 && dir == "left") {
            result = 4;
          } else if (disY < -30 && dir == "up") {
            $("#listPanel").scrollTop(parseInt(Math.abs(point_end.y - point_start.y)));
            result = 1;
          }
        } else {
          $("#listPanel").css({
            transition: "all 1s",
            transform: "translate3d(0,0,0)"
          }).animate({
            scrollTop: '30px'
          }, 300);
          $("#notification").css({
            height: "30px",
            lineHeight: "30px"
          }).html("").hide();
        }
      }

      $("#listPanel").on(startEvt, function (e) {
        if ($(this).scrollTop() <= 0) {
          startEvtHandle(e);
          $(this).on(moveEvt, moveEvtHandle);
          $(this).on(endEvt, function (e) {
            endEvtHandle(e);
            $(this).off(moveEvt).off(endEvt);
          });
        }
      })
    }
    myTouchEvent();
    //remove the loading anime
    setTimeout(() => {
      $("#loadingWrap").animate({
        opacity: 0
      }, 1000);
      setTimeout(() => {
        $("#loadingWrap").css({
          display: 'none'
        });
      }, 1100);
    }, 1000)

    //socket.io
    allChat.on("connect", () => {
      config.socket.id = allChat.id;
      const sid = allChat.id;
      console.log('#connected', sid, allChat);
      // 监听自身 id 以实现 p2p 通讯
      allChat.on(sid, msg => {
        console.log('#receive,', msg);
        switch (msg.data.action) {
          case 'deny':
            {
              console.warn('你被强制下线');
              showNotification('你被强制下线');
              infoBoxCompiled(getPayloadFromMsg(msg), 'Warning');
              scrollToBottom();
              allChat.close();
              break;
            }
          case 'welcome':
            {
              showNotification(`welcome: ${config.userinfo.username}，下拉加载更多历史消息`);
              infoBoxCompiled(getPayloadFromMsg(msg), 'Welcome');
              scrollToBottom();
              break;
            }
          case 'warning':
            {
              infoBoxCompiled(getPayloadFromMsg(msg), 'Warning');
              scrollToBottom();
              break;
            }
          case 'private_message':
            {
              console.log('private:', msg);
              messageBoxCompiled(getPayloadFromMsg(msg));
              scrollToBottom();
              break;
            }
        }
      });
    });

    // 接收在线用户列表信息
    allChat.on('online', msg => {
      console.log('#online,', msg);
      switch (msg.action) {
        //update user list in room
        case 'update':
          {
            //push self into onlineUsers
            /* msg.onlineUsers.unshift({
              userid: config.userinfo.userid,
              username: config.userinfo.username,
              socketid: config.socket.id,
              avatar: config.userinfo.avatar,
              room: config.socket.room,
              ipAddress: config.userinfo.ipAddress,
            }); */
            roomCardBoxCompiled({
              onlineUsers: msg.onlineUsers,
              room: config.socket.room,
              onlineCount: msg.onlineUsers.length,
              max: msg.max,
              show: true,
            })
            config.socket.onlineCount = msg.onlineUsers.length;
            config.socket.max = msg.max;
            break;
          };
          //new use join
        case 'join':
          {
            roomOnlineUserBoxCompiled(msg.userinfo);
            config.socket.onlineCount++;
            //更新room在线人数
            $(`.room-online-count[data-room="${msg.userinfo.room}"]`).html(config.socket.onlineCount);
            //通知
            infoBoxCompiled({
              type: 'welcome',
              content: `用户 ${msg.userinfo.username} [ID:${msg.userinfo.userid}]加入了聊天室.`,
            });
            scrollToBottom();
            break;
          };
        case 'leave':
          {
            let userinfo = msg.userinfo;
            let userNode = $(`.user-list-item[data-userid="${userinfo.userid}"]`);
            // let parentNodeId = `#room-${msg.userinfo.room}-list`;
            //移除用户
            userNode.remove()
            /* //将离线用户放在列表最后
            if (userNode.parents(parentNodeId).nextAll().length > 0) {
              userNode.parents(parentNodeId).next().after(userNode.parents(parentNodeId).prop('outerHTML'));
              userNode.parents(parentNodeId).remove();
            }
            //设置离线用户背景
            userNode.css({
              'background-color': '#eee'
            }); */
            config.socket.onlineCount--;
            //更新room在线人数
            $(`.room-online-count[data-room="${msg.userinfo.room}"]`).html(config.socket.onlineCount);
            //通知
            infoBoxCompiled({
              type: 'leave',
              content: `用户 ${msg.userinfo.username} [ID:${msg.userinfo.userid}]离开了.`,
            });
            scrollToBottom();
            break;
          };
      }
    });

    //room message
    allChat.on("room_message", (msg) => {
      msg = getPayloadFromMsg(msg);
      messageBoxCompiled(msg);
      scrollToBottom();
    })

    //send room message
    $("#sendBtn").click(function () {
      // let hasPrivate = $('#inputText').html().match(privateMessageReg);
      let msg = {};
      // console.log(hasPrivate);
      let hasPrivate = $('#privatePlaceHolder')[0];
      if (hasPrivate) {
        let ele = $('#privatePlaceHolder');
        let toSocketid = ele.data('socketid');
        let toUserid = ele.data('userid');
        let toUsername = ele.data('username');
        ele.remove();
        //内容为空则返回
        if (!$("#inputText").html()) return;
        msg = {
          from: config.userinfo.userid,
          to: toUserid,
          toType: 'private',
          room: config.socket.room,
          content: $("#inputText").html(),
        };
        allChat.emit("private_message", msg);
        msg.from = {
          userid: config.userinfo.userid,
          username: config.userinfo.username,
          avatar: config.userinfo.avatar,
        };
        msg.to = {
          userid: toUserid,
          username: toUsername,
        }
      } else {
        msg = {
          from: config.userinfo.userid,
          toType: 'room',
          room: config.socket.room,
          content: $("#inputText").html(),
        };
        //内容为空则返回
        if (!msg.content) return;
        allChat.emit("room_message", msg);
        msg.from = {
          userid: config.userinfo.userid,
          username: config.userinfo.username,
          avatar: config.userinfo.avatar,
        };
      }
      $("#inputText").html("");
      messageBoxCompiled(msg, "right");
      var scrollHeight = $("#listPanel")[0].scrollHeight - $("#listPanel")[0].clientHeight;
      $("#listPanel").animate({
        scrollTop: scrollHeight
      }, 300);
      var minHeight = parseInt($("#inputText").css("minHeight"));
      if ($(this)[0].clientHeight !== minHeight) {
        $("#sendBtn").css("height", minHeight);
        $("#emojiBtn").css("height", minHeight);
        $("#listPanel").css("height", "calc(100vh - 40px - " + minHeight + "px)")
      }
      scrollToBottom()
    })

    // 系统事件
    allChat.on('disconnect', msg => {
      console.log('#disconnect', msg);
    });

    allChat.on('disconnecting', () => {
      console.log('#disconnecting');
    });

    allChat.on('error', () => {
      console.log('#error');
    });

    //系统通知
    allChat.on('notification', (msg) => {
      console.log('#notification', msg);
      showNotification(msg.data.payload.content);
    })

    //系统提示
    allChat.on('info', (msg) => {
      console.log('#info', msg);
      msg = getPayloadFromMsg(msg);
      infoBoxCompiled(msg, 'SystemInfo');
      scrollToBottom();
    })
  } else {
    alert('Server Error!');
  }
})

$('body').on({
  'click': function (e) {
    var target = e.target;
    if (target == $('#plusBtn')[0]) {
      let bottom = $("#inputBox").height()
      $('#plusPanel').css({
        display: 'flex',
        opacity: '0',
        bottom: 0
      }).addClass('plusPanelShow').animate({
        bottom: bottom
      }, 300);
    } else {
      $('#plusPanel').removeClass('plusPanelShow').css({
        display: 'none',
        bottom: 0
      });
    }
  }
})

$('#chooseImage').on('change', () => {
  let file = new FormData();
  let data = $('#chooseImage')[0].files[0];
  file.append('file', data);
  let onprogress = (evt) => {
    let loaded = evt.loaded; //已经上传大小情况 
    let tot = evt.total; //附件总大小 
    let per = Math.floor(100 * loaded / tot); //已经上传的百分比 
    // $('#c-r-s-panel-guests-addnew-avatar').prev().children('i').css({
    //   height: per + '%'
    // })
    console.info('upload:', per);
  }
  let url = `/allChat/uploadImage?userid=${config.userinfo.userid}`;

  $.ajax({
    url: url,
    type: 'POST',
    contentType: false,
    processData: false,
    data: file,
    xhr: function () {
      let xhr = $.ajaxSettings.xhr();
      if (onprogress && xhr.upload) {
        xhr.upload.addEventListener("progress", onprogress, false);
        return xhr;
      }
    },
    success: function (res) {
      if (res && res != '-1') {
        //upload success
        let imageurl = res;
        let content = `<img class="imageContent" src="${imageurl}">`;
        var msg = {
          from: config.userinfo.userid,
          content: content,
        };
        allChat.emit("room_message", msg);
        msg.from = {
          userid: config.userinfo.userid,
          username: config.userinfo.username,
          avatar: config.userinfo.avatar,
        };
        messageBoxCompiled(msg, "right");
        var scrollHeight = $("#listPanel")[0].scrollHeight - $("#listPanel")[0].clientHeight;
        $("#listPanel").animate({
          scrollTop: scrollHeight
        }, 300);
        scrollToBottom();
      } else {
        console.log(fail);
      }
    }
  })
})