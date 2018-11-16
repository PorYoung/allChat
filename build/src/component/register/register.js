import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '../../lib/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../lib/csrfAjax'
import './register.less'
import {
  myLoading,
  myLoadingSuccess,
  myLoadingFail
} from '../myLoading'

// $(function ($) {
var checkForm = {
  username: false,
  password: false,
  confirmPassword: false
}
//submit按钮状态
var checkSubmit = function () {
  if (checkForm.username && checkForm.password && checkForm.confirmPassword) {
    $("#submit").removeAttr("disabled");
  } else {
    $("#submit").attr("disabled", "disabled");
  }
}
//用户名验证 警惕ajax的异步性
$("#username").focus(function () {
  $(".check-icon:eq(0)").removeClass("fa fa-spinner fa-spin fa-check fa-times").html("(字母、数字或_ 3-16位)").css("color", "#FFF");
}).blur(function () {
  if (!checkForm.username) {
    //兼容问题
    //$("#username").focus();
    $(".check-icon:eq(0)").removeClass("fa fa-spinner fa-spin fa-check fa-times").html("请输入正确用户名").css("color", "#FFF").animate({
      fontSize: "1.2em"
    }, function () {
      $(this).animate({
        fontSize: "1em"
      });
    })
  }
  checkSubmit();
}).on("input porpertychange", function () {
  var reg = new RegExp(/^(_?)([a-zA-Z0-9-](_)?){3,16}$/);
  if (reg.test($(this).val())) {
    // $(".check-icon:eq(0)").html("<i class='fa fa-spinner fa-spin'></i>");
    $(".check-icon:eq(0)").removeClass("fa fa-times fa-check").addClass('fa fa-spinner fa-spin').css({
      top: "initial",
      color: "#fff"
    }).html("");
    $.get("/register/checkUsername?username=" + $("#username").val(), function (res) {
      if (res.toString() === "1") {
        //用户名可以使用
        $(".check-icon:eq(0)").removeClass("fa fa-spinner fa-spin fa-times").addClass("fa fa-check").css({
          top: "initial",
          color: "#00EE00"
        }).html("").attr("title", "用户名可以使用");
        checkForm.username = true;
        checkSubmit();
      } else {
        //用户名已存在
        $(".check-icon:eq(0)").removeClass("fa fa-spinner fa-spin fa-check").addClass("fa fa-times").css({
          top: "initial",
          color: "#CC0000"
        }).html("").attr("title", "用户名已存在");
        checkForm.username = false;
        checkSubmit();
      }
      //                    checkSubmit();
    });
  } else {
    //用户名输入错误
    $(".check-icon:eq(0)").removeClass("fa fa-spinner fa-spin fa-check fa-times").html("您的格式不对哦").css("color", "#FFF").removeAttr("title");
    checkForm.username = false;
  }
  checkSubmit();
});

//密码验证
//对比确认框和密码框
var comparePassword = function () {
  if ($("#confirm-password").val() === $("#password").val() && checkForm.password) {
    //密码一致
    $(".check-icon:eq(2)").removeClass("fa fa-times").addClass("fa fa-check").css({
      top: "initial",
      color: checkForm.passwordColor
    }).attr("title", "OK").html("");
    checkForm.confirmPassword = true;
    checkSubmit();
  } else {
    //密码不一致
    $(".check-icon:eq(2)").removeClass("fa fa-check").addClass("fa fa-times").css({
      top: "initial",
      color: "#CC0000"
    }).attr("title", "unmatched").html("");
    checkForm.confirmPassword = false;
    $("#submit").attr("disabled", "disabled");
  }
}
$("#password").focus(function () {
  $(".check-icon:eq(1)").removeClass("fa fa-times fa-check").html("(letter|number|punctuation 6-20)").css("color", "#FFF");
}).blur(function () {
  if (!checkForm.password) {
    //                兼容问题
    //                this.focus();
    $(".check-icon:eq(1)").removeClass("fa fa-times fa-check").html("请验证密码格式").css("color", "#FFF").animate({
      fontSize: "1.2em"
    }, function () {
      $(this).animate({
        fontSize: "1em"
      });
    });
  }
  checkSubmit();
}).on("input propertychange", function () {
  var regH = new RegExp(/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*:,.?;]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*:,.?;]+$)(?![\d!@#$%^&*:,.?;]+$)[a-zA-Z\d!@#$%^&*:,.?;]{6,20}$/),
    regM = new RegExp(/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*:,.?;]+$)[a-zA-Z\d!@#$%^&*:,.?;]{6,20}$/),
    regL = new RegExp(/^(?:\d+|[a-zA-Z]+|[!@#$%^&*:,.?;]+){6,20}$/);
  if (regH.test($(this).val())) {
    //密码高强度 字母+数字+特殊字符
    $(".check-icon:eq(1)").removeClass("fa fa-times").addClass("fa fa-check").css({
      top: "initial",
      color: "#00EE00"
    }).attr("title", "密码强度高").html("");
    checkForm.password = true;
    checkForm.passwordColor = "#00EE00";
  } else if (regM.test($(this).val())) {
    //密码高强中 字母+数字+特殊字符
    $(".check-icon:eq(1)").removeClass("fa fa-times").addClass("fa fa-check").css({
      top: "initial",
      color: "#FF8000"
    }).attr("title", "密码强度中").html("");
    checkForm.password = true;
    checkForm.passwordColor = "#FF8000";
  } else if (regL.test($(this).val())) {
    //密码高强弱 字母+数字+特殊字符
    $(".check-icon:eq(1)").removeClass("fa fa-times").addClass("fa fa-check").css({
      top: "initial",
      color: "#B0171F"
    }).attr("title", "密码强度弱").html("");
    checkForm.password = true;
    checkForm.passwordColor = "#B0171F";
  } else {
    $(".check-icon:eq(1)").removeClass("fa fa-check").addClass("fa fa-times").css({
      top: "initial",
      color: "#CC0000"
    }).attr("title", "密码格式不正确").html("");
    checkForm.password = false;
    checkForm.passwordColor = "#CC0000";
  }
  //同时对比密码确认框
  comparePassword();
})
//确认密码框验证
$("#confirm-password").focus(function () {
  $(".check-icon:eq(2)").html("");
}).blur(function () {
  if (!checkForm.confirmPassword && checkForm.password) {
    //                兼容问题
    //                $(this).focus();
    $(".check-icon:eq(2)").removeClass("fa fa-times fa-check").html("两次密码不一致").css("color", "#FFF").animate({
      fontSize: "1.2em"
    }, function () {
      $(this).animate({
        fontSize: "1em"
      });
    });
  }
  checkSubmit();
}).on("input propertychange", function () {
  comparePassword();
});
//提交表单
$("#submit").click(function () {
  if (checkForm.username && checkForm.password && checkForm.confirmPassword) {
    //表单验证完成
    var clearMyLoading = myLoading("Waiting...");
    $.post("/register", {
      username: $("#username").val(),
      password: $("#password").val()
    }, function (res) {
      if (res === "1") {
        //注册成功
        clearMyLoading();
        myLoadingSuccess();
        setTimeout(function () {
          window.location.href = "/allChat";
        }, 1200);
      } else {
        //注册失败
        clearMyLoading();
        myLoadingFail('', 1200);
      }
    })
  }
})
// })