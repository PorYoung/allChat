import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../lib/font-awesome-4.7.0/css/font-awesome.min.css';
import '../../lib/csrfAjax';
const socketClient = require('socket.io-client');
const allChat = socketClient('http://127.0.0.1:7001/allChat');
const userinfo = {};
//get user info
$.get('/allChat/getUserinfo', (data) => {
  if (data && data != -1) {
    Object.assign(userinfo, data);

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
    allChat.on("connected", function () {
      allChat.emit("connection", {
        from: userinfo.username,
        content: "new connection"
      })
    })
    allChat.on("notification", function (msg) {
      console.log(msg);
    })
    allChat.on("message", function (msg) {
      console.log(msg);
    })
    allChat.on("hi", function (msg) {
      console.log(msg);
    })
  } else {
    alert('Server Error!');
  }
})