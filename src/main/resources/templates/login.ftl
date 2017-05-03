<div class="dly">
  <form id="loginForm" action="/login" autocomplete="off" method="post">
    <div class="row">
      <div class="col-md-3">
        <div class="form-group">
          <label class="control-label visible-ie8 visible-ie9">用户名</label>
          <div class="input-icon">
            <input type="text" placeholder="用户名" maxlength="12" class="no_empty phone_number" name="username" autocomplete="off">
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label class="control-label visible-ie8 visible-ie9">密码</label>
          <div class="input-icon">
            <input type="password" name="password" maxlength="14" placeholder="密码" oncontextmenu="return false" onpaste="return false" autocomplete="off"/>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label class="control-label visible-ie8 visible-ie9">验证码</label>
          <div class="input-icon">
            <input class="form-control-code placeholder-no-fix" type="text" autocomplete="off" placeholder="验证码" name="kaptcha"/>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
            <span class="input-group-btn-1">
                <img src="/cms/code/captchaImage" onclick="changeVerifyCode()" id="kaptcha" style="cursor: pointer;">
                <a href="javascript:void(0)" onclick="changeVerifyCode()">看不清，换一张</a>
                </span>
        </div>
      </div>
    </div>
    <button  type="submit" id="login">登录<button>
  </form>
</div>
<script src="../../components/jquery/dist/jquery.js"></script>
<script type="text/javascript">
  //点击切换验证码
  function changeVerifyCode() {
    $("#kaptcha").attr("src", "/cms/code/captchaImage?" + Math.floor(Math.random() * 100));
  }
</script>