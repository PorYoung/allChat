// import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './login.less'
import '../../lib/csrfAjax'
// $(($) => {
let login = () => {
  let username = $("#username").val()
  let password = $("#password").val()
  if (!username || !password) {
    $("#alert").show(500);
    $("#alert-s2").html("username and password connot be null.");
    return
  }

  $.post("/login", {
    username: username,
    password: password
  }, function (res) {
    switch (res.toString()) {
      case "-2":
      case "-1":
        $("#alert").show(500);
        $("#alert-s2").html("Mismatched username and password.Check again.");
        break;
      case "1":
        $("#alert").removeClass("alert-warning").addClass("alert-success").show(500);
        $("#alert-s2").html("欢迎 " + $("#username").val() + "登陆☺");
        $("#alert-s1").addClass("glyphicon glyphicon-ok").attr("color", "green").html("");
        setTimeout(function () {
          window.location.href = "/allChat";
        }, 1000);
        break;
      case "2":
        $("#alert").removeClass("alert-warning").addClass("alert-success").show(500);
        $("#alert-s1").addClass("glyphicon glyphicon-ok").attr("color", "green").html("");
        $("#alert-s2").html($("#username").val() +
          "您好，您的账户已被登录，系统正在为您将其下线，<em id='countdown'></em>秒后将登录成功。p.s:如非本人，请及时更改密码哦☺");
        var countdown = 6;
        var timer = setInterval(function () {
          countdown--;
          $("#countdown").html(countdown);
        }, 1000);
        setTimeout(function () {
          clearInterval(timer);
          window.location.href = "/allChat";
        }, 6000);
        break;
      default:
        $("#alert").show(500);
        $("#alert-s2").html("Sorry.Please try again.");
        break;
    }
  })
}
$("#submit").click(function () {
  login()
})
$("#password").keyup((e) => {
  if (e && e.keyCode == '13') {
    login();
  }
})
$("#register").click(function () {
  window.location.href = "/register";
})
// })