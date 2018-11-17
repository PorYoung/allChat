import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../lib/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../lib/csrfAjax';
import './allChat.less';
var $ = require('jquery');
const config = {
  userinfo: {},
  socket: {
    room: 'default',
    id: null,
  },
};
const socketClient = require('socket.io-client');
const allChat = socketClient('http://127.0.0.1:7001/allChat', {
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

//定义函数：显示通知框
var showNotification = function showNotification(text) {
  $('#notification').html(text).show('fast');
  setTimeout(function () {
    $('#notification').html('').hide('fast');
  }, 3000);
}

//定义行数：显示系统提示
const infoBoxCompiled = (info) => {
  let infoBox = `<div class="message-info" id="first"><div class="message-info-arrow"></div><div class="titleContainer"><h3><{= info.type }></h3></div><div class="mainContainer"><p><{= info.content }></p></div></div>`;
  let compiled = _.template(infoBox);
  return compiled({
    info
  });
};

//定义函数：使用消息模板
var messageBoxCompiled = function messageBoxCompiled(msg, position) {
  position = position ? position : "left";
  /*  var messageBox = !!msg.type && msg.type == "image" ? '<div class="message-list message-list-left"><img src="<{= msg.avatar }>" class="avatar"/><em class="list-group-item-heading"><{= msg.from.username }></em> <div class="list-group-item"> <i style="position: absolute" class="fa fa-menu-left"></i><p class="list-group-item-text"><img src="<{= msg.mediaId }>" data-imgurl="<{= msg.mediaId }>" class="weixinServerImage weixinServerImageActive"></p></div></div>' : '<div class="message-list message-list-left"><img src="<{= msg.avatar }>" class="avatar"/><em class="list-group-item-heading"><{= msg.from.username }></em> <div class="list-group-item"> <i style="position: absolute" class="fa fa-menu-left"></i> <p class="list-group-item-text"><{= msg.content }></p></div></div>' */
  var messageBox = '<div class="message-list message-list-left"><div class="list-group-header"><img src="<{= msg.from.avatar }>" class="avatar"/><em class="list-group-item-heading"><{= msg.from.username }></em> </div> <div class="list-group-item"> <i style="position: absolute" class="fa fa-menu-left"></i> <p class="list-group-item-text"><{= msg.content }></p></div></div>';
  if (position === "right") {
    //右
    messageBox = messageBox.replace(/left/g, "right").replace(/(<img.+\/>)(<em.+<\/em>)/, "$2$1");
  }
  var compiled = _.template(messageBox);
  return compiled({
    msg
  });
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

//手风琴一级菜单模板
const roomCardBoxCompiled = (cardinfo) => {
  let users = cardinfo.onlineUsers;
  let onlineUserBoxs = [];
  users.forEach((user) => {
    onlineUserBoxs.push(
      `<div class="card user-list-item" data-socktid="${user.socketid}">
        <div class="card-header user-list-header" id="room-${cardinfo.room}-user-btn">
          <img src="${user.avatar}" class="user-list-avatar">
          <i class="user-list-username">${user.username}</i>
        </div>
      </div>`);
  });
  let cardBox =
    `<div class="card">
    <div class="card-header" id="room-${cardinfo.room}-btn">
        <h5 class="mb-0">
            <button class="btn btn-link" data-toggle="collapse" data-target="#room-${cardinfo.room}" aria-expanded="true"
                aria-controls="collapseOne">
                ${cardinfo.room}
            </button>
            <i class="card-tips">${cardinfo.onlineCount}/${cardinfo.max}</i>
        </h5>
    </div>

    <div id="room-${cardinfo.room}" class="collapse ${cardinfo.show?'show':''}" aria-labelledby="headingOne" data-parent="${cardinfo.collapseParent||''}">
        <div class="card-body" id="room-${cardinfo.room}-content">
            ${onlineUserBoxs}
        </div>
    </div>
  </div>`;
  let compiled = _.template(cardBox);
  return compiled({
    cardinfo
  });
};
//二级菜单模板-z在线用户列表
// const roomOnlineUserBoxCompiled


//get user info
$.get('/allChat/getUserinfo', (data) => {
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
          var compiled = _.template($("#message-template").html());
          $("#listPanel").prepend(compiled({
            data
          }));
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
            // loadMessage(++page);
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
              allChat.close();
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
            msg.onlineUsers.unshift({
              userid: config.userinfo.userid,
              username: config.userinfo.username,
              socketid: config.socket.id,
              avatar: config.userinfo.avatar,
            });
            $("#accordion").append(roomCardBoxCompiled({
              onlineUsers: msg.onlineUsers,
              room: config.socket.room,
              onlineCount: msg.onlineUsers.length + 1,
              max: msg.max,
              show: true,
            }));
            break;
          }
      }
    });

    //room message
    allChat.on("room_message", (msg) => {
      msg = getPayloadFromMsg(msg);
      $("#listPanel").append(messageBoxCompiled(msg));
      scrollToBottom();
    })

    //send room message
    $("#sendBtn").click(function () {
      var msg = {
        from: config.userinfo.userid,
        // to: config.socket.room,
        toType: 'room',
        room: config.socket.room,
        content: $("#inputText").html(),
      };
      //内容为空则返回
      if (!msg.content) return;
      allChat.emit("room_message", msg);
      $("#inputText").html("");
      msg.from = {
        userid: config.userinfo.userid,
        username: config.userinfo.username,
        avatar: config.userinfo.avatar,
      };
      $("#listPanel").append(messageBoxCompiled(msg, "right"));
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
      $("#listPanel").append(infoBoxCompiled(msg));
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
          to: config.socket.room,
          content: content,
        };
        allChat.emit("room_message", msg);
        msg.from = {
          userid: config.userinfo.userid,
          username: config.userinfo.username,
          avatar: config.userinfo.avatar,
        };
        $("#listPanel").append(messageBoxCompiled(msg, "right"));
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