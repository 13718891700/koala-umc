
<div class="navbar-container ace-save-state" id="navbar-container">
  <!-- #section:basics/sidebar.mobile.toggle -->
  <button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
    <span class="sr-only">Toggle sidebar</span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
  </button>
  <!-- /section:basics/sidebar.mobile.toggle -->
  <div class="navbar-header pull-left">
    <!-- #section:basics/navbar.layout.brand -->
    <a href="#" class="navbar-brand">
      <small style="position: absolute;top:0;">
        <img src="../assets/images/logo.jpg" alt="" style="background-size:100% 100%">
      </small>
    </a>
    <!-- /section:basics/navbar.layout.brand -->
    <!-- #section:basics/navbar.toggle -->
    <!-- /section:basics/navbar.toggle -->
  </div>
  <#--<div class="navbar-title">
    分拣系统
  </div>-->
  <!-- #section:basics/navbar.dropdown -->
  <div class="navbar-buttons navbar-header pull-right" role="navigation">
    <ul class="nav ace-nav">
      <li class="purple dropdown-modal" style="display:none">
        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
        <#--<i class="ace-icon fa fa-bell icon-animated-bell"></i>-->
          <i class="ace-icon fa fa-bell "></i>
        <#--<span class="badge badge-important">8</span>-->
        </a>
      </li>
      <li class="green dropdown-modal" style="display:none">
        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
        <#--<i class="ace-icon fa fa-envelope icon-animated-vertical"></i>-->
          <i class="ace-icon fa fa-envelope "></i>
        <#--<span class="badge badge-success">5</span>-->
        </a>
      </li>
      <!-- #section:basics/navbar.user_menu -->
      <li class="light-blue dropdown-modal">
        <a data-toggle="dropdown" href="#" class="dropdown-toggle">
        <#--<img class="nav-user-photo" src="../../assets/avatars/user.jpg" alt="Jason's Photo" />-->
          <span class="user-info">
              <small>欢迎,</small>
          ${(user.userName)!}
            </span>
          <i class="ace-icon fa fa-caret-down"></i>
        </a>
        <ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
          <#--<li>-->
            <#--<a href="#">-->
              <#--<i class="ace-icon fa fa-cog"></i>-->
              <#--设置-->
            <#--</a>-->
          <#--</li>-->
        <#--<li>
          <a href="#dms/user/toEditDmsUserPwdPage/${(user.id)!}" data-url="">
              <i class="ace-icon fa fa-key"></i>
              重置密码
          </a>
        </li>-->
          <#--<li class="divider"></li>-->
          <li>
            <a id="logout">
              <i class="ace-icon fa fa-power-off"></i>
              注销
            </a>
          </li>
        </ul>
      </li>
      <!-- /section:basics/navbar.user_menu -->
    </ul>
  </div>
  <!-- /section:basics/navbar.dropdown -->
</div><!-- /.navbar-container -->