// 登陆控制
$(".login").on("mouseover", function () {
  $(".hgzt").css("display", "block");
}).on("mouseout", function () {
  $(".hgzt").css("display", "none");
});
$(".login").on("click", function () {
  $(".djdl").css("display", "block");
});
$(".login").on("mouseover", function () {
  $('.djdl').css("display", "block");
});
$(".login").on("mouseout", function () {
  $('.djdl').css("display", "none");
});
$(".dl_right").on("mouseover", function () {
  $(".hgzc").css("display", "block");
}).on("mouseout", function () {
  $(".hgzc").css("display", "none");
});
$(".hyn").on("mouseover", function () {
  $(".hghyn").css("display", "block");
});
$(".hghyn").on("mouseover", function () {
  $(this).css("display", "block");
});
$(".hghyn").on("mouseout", function () {
  $(this).css("display", "none");
});
$(".djdl").on("click", "span", function () {
  $(".djdl").css("display", "none");
});
$(".djdl").on("mouseover", function () {
  $(this).css("display", "block");
});
$(".djdl").on("mouseout", function () {
  $(this).css("display", "none");
});
$(".gb").on("click", function () {
  $(".djdl").css("display", "none");
});

// 登陆页面
$(function () {
  var href = getCookie("systermId");
  var liIndex;
  window.location.hash.substring(1).length == 4 ? href = window.location.hash.substring(1) : '';
  href == "" ? $("#mask").css("display", "block") : '';
  function setAnimate() {
    switch (href) {
      case '3000':
        $(".dlz .yueyingtu:first").css({'display': 'block'});
        $(".dlz .yueyingtu:last-child").css({'display': 'none'});
        break;
      case '1000':
        $(".dlz .yueyingtu:last-child").css({'display': 'block'});
        $(".dlz .yueyingtu:first").css({'display': 'none'});
        break;
    }
    $("#mask,.djdl").css("display", "none");
    setCookie("systermId", href, 30000000000);
  }

  switch (href) {
    case '3000':
      $(".theme").text("客户登录");
      setAnimate(href);
      break;
    case '2000':
      $(".theme").text("伙伴登录");
      layer.msg("本平台暂未开放，请选择其他平台");
      break;
    case '1000':
      $(".theme").text("运营登录");
      setAnimate(href);
      break;
  }
  $(".chose-sys li").on("click", function () {
    liIndex = $(this).index();
    switch (liIndex) {
      case 0:
        href = "3000";
        $(".theme").text("客户登录");
        setAnimate(href);
        break;
      case 1:
        href = "1000";
        $(".theme").text("运营登录");
        setAnimate(href);
        break;
      case 4:
        href = "3000";
        layer.msg("本平台暂未开放，请选择其他平台");
        setAnimate(href);
        break;
    }
  });
  // 表单验证
  function ajax(data) {
    $.ajax({
      type: "post",
      url: "/login",
      dataType: "json",
      data: data,
      beforeSend: function () {
        $("#login").val("正在登录");
        $("#login").attr("disabled", "disabled");
        $("#login").css({"background": "#438EB9"});
      },
      success: function (result) {
        if (result == undefined || result == null) {
          $("#login").val("登录");
          $("#login").removeAttr("disabled");
          $("#login").css({"background": "#008bca"});
          layer.msg("HTTP请求无数据返回", {
            icon: 1
          });
        } else if (result.code == "200") {
          var token = result.result;
          if (!token) {
            $("#login").val("登录");
            $("#login").removeAttr("disabled");
            $("#login").css({"background": "#008bca"});
            alert("页面已失效,请刷新页面重试");
            return
          }
          window.localStorage.setItem('token', token);
          window.location.href = "/welcome?token=" + token
        } else {
          $("#login").val("登录");
          $("#login").removeAttr("disabled");
          $("#login").css({"background": "#008bca"});
          var message = code_map.get(result.code);
          if (message == '' || message == null) {
            $('.error_tishi').show();
            $('.error_tishi .err_pre').html('登录失败');
          } else {
            $('.error_tishi').show();
            $('.error_tishi .err_pre').html(message);
          }
        }
      },
      error: function () { //请求完成后最终执行参数
        $('.error_tishi').show();
        $('.error_tishi .err_pre').html('登录失败');
        $("#login").val("登录");
        $("#login").removeAttr("disabled");
        $("#login").css({"background": "#008bca"});
      }
    });
  }

  function submitLogin() {
    var param = {};
    var aesKey = $("#SecToken").val();
    var loginName = $(".phone_number").val();
    var password = $(".password").val();
    if (!loginName && !password) {
      $('.error_tishi').show();
      $('.err_pre').html('请填写用户名或手机号');
      $(".phone_number").focus();
    } else if (loginName && !password) {
      if (/^[a-zA-Z0-9]{5,14}$/.test(loginName)) {
        $('.error_tishi').show();
        $('.err_pre').html('请填写密码');
        $(".password").focus();
      } else {
        $('.error_tishi').show();
        $('.err_pre').html('用户名为数字或字母6-12位');
        $(".phone_number").focus();
      }
    } else if (loginName && password) {
      if (/^[a-zA-Z0-9]{5,12}$/.test(loginName) && /^[a-zA-Z0-9]{6,14}$/.test(password)) {
        param.loginName = aesEncrypt(loginName, aesKey, aesKey);
        param.loginPwd = aesEncrypt(password, aesKey, aesKey);
        param.systemId = href;
        ajax(param);
      } else if (!/^[a-zA-Z0-9]{5,12}$/.test(loginName) && /^[a-zA-Z0-9]{6,14}$/.test(password)) {
        $('.error_tishi').show();
        $('.err_pre').html('用户名为数字或字母6-12位');
        // $('.err_pre').html('用户名或密码错误');
      } else if (/^[a-zA-Z0-9]{5,12}$/.test(loginName) && !/^[a-zA-Z0-9]{6,14}$/.test(password)) {
        $('.error_tishi').show();
        $('.err_pre').html('密码为数字或字母6-14位');
      } else if (!/^[a-zA-Z0-9]{5,12}$/.test(loginName) && !/^[a-zA-Z0-9]{6,14}$/.test(password)) {
        $('.error_tishi').show();
        $('.err_pre').html('用户名为数字或字母6-12位');
      }
    }
  }

  var inputs = $('.no_empty');
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].getAttribute("type") == "text")
      inputs[i].onkeyup = function () {
        this.value = this.value.replace(/(^\s+)|\s+$/g, "");
      };
  }
  $(".phone_number").on('input', function () {
    $('.error_tishi').hide();
  });
  $(".password").on('input', function () {
    $('.error_tishi').hide();
  });
  $('#login').on('click', function () {
    submitLogin();
  });
  $(document).on('keydown', function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
      submitLogin();
    }
  })
});

$(".password").on("focus", function () {
  $("#phone_number-error").text("");
});
$(".phone_number").on("focus", function () {
  $("#phone_number-error").text("");
});


















