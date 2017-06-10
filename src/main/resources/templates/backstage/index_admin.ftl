<html>
  <head>
    <title>后台管理</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my backstage">
	
	<link href="/assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href="/assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
	<link href="/assets/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css" rel="stylesheet" type="text/css"/>
	<link href="/assets/plugins/fullcalendar/fullcalendar/fullcalendar.css" rel="stylesheet" type="text/css"/>
	<link href="/css/main.css" rel="stylesheet">
	<link href="/assets/css/style.css" rel="stylesheet" type="text/css"/>
	<link href="/assets/css/style-responsive.css" rel="stylesheet" type="text/css"/>
	<link href="/assets/css/themes/default.css" rel="stylesheet" type="text/css" id="style_color"/>
	<link rel="stylesheet" type="text/css" href="/assets/plugins/sweetalert/sweetalert.css">
	<link rel="shortcut icon" href="/favicon.ico"/>
 </head>
	<!-- BEGIN BODY -->
	<body class="page-header-fixed">
		<div class="header navbar navbar-inverse navbar-fixed-top">
			<div class="header-inner">
				<a class="navbar-brand" href="index.html">
				<img src="/assets/img/logo.png" alt="logo" class="img-responsive"/>
				</a>
				<a href="javascript:;" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
				<img src="/assets/img/menu-toggler.png" alt=""/>
				</a>
				<ul class="nav navbar-nav pull-right">
					<li class="dropdown" id="header_inbox_bar">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
							<i class="fa fa-envelope"></i>
							<span class="badge">5</span>
						</a>
					</li>
					<li class="dropdown user">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
							<img alt="" src="/assets/img/avatar1_small.jpg"/>
							<span class="username">星星</span>
							<i class="fa fa-angle-down"></i>
						</a>
						<ul class="dropdown-menu">
							<li class="divider">
							</li>
							<li>
								<a href="javascript:;" id="trigger_fullscreen"><i class="fa fa-move"></i>全屏</a>
							</li>
							<li>
								<a href="/sys/showLockScreen"><i class="fa fa-lock"></i>锁屏</a>
							</li>
							<li>
								<a href="/logout"><i class="fa fa-key"></i>注销登录</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
		<!-- BEGIN SIDEBAR -->
		<div class="page-sidebar-wrapper">
			<div class="page-sidebar navbar-collapse collapse">
				<!-- BEGIN SIDEBAR MENU -->
				<ul class="page-sidebar-menu">
					<li class="sidebar-toggler-wrapper">
						<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
						<div class="sidebar-toggler hidden-phone">
						</div>
						<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
					</li>
					<li class="sidebar-search-wrapper">
						<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
						<form class="sidebar-search" action="extra_search.html" method="POST">
							<div class="form-container">
								<div class="input-box">
									<a href="javascript:;" class="remove"></a>
									<input type="text" placeholder="搜索"/>
									<input type="button" class="submit" value=" "/>
								</div>
							</div>
						</form>
						<!-- END RESPONSIVE QUICK SEARCH FORM -->
					</li>
					<li class="start active ">
						<a href="javascript:loadJsp('/photo/loadPhotoMng')">
						<i class="fa fa-home"></i>
						<span class="title">
							后台管理
						</span>
						<span class="selected">
						</span>
						</a>
					</li>
					<li class="">
						<a href="javascript:;">
						<i class="fa fa fa-gift"></i>
						<span class="title">
							开发案例
						</span>
						<span class="arrow ">
						</span>
						</a>
						<ul class="sub-menu">
							<li>
								<a href="javascript:loadJsp('/demo/showDemoMng')">
									<span class="badge badge-info">new</span>demo列表(一)
								</a>
							</li>
							<li>
								<a href="javascript:loadJsp('/demo/showDemoMng_1')">
									<span class="badge badge-success">new</span>demo列表(二)
								</a>
							</li>
						</ul>
					</li>
					<li class="">
						<a href="javascript:;">
						<i class="fa fa-camera"></i>
						<span class="title">
							照片管理
						</span>
						<span class="arrow ">
						</span>
						</a>
						<ul class="sub-menu">
							<li>
								<a href="javascript:loadJsp('/photo/loadPhotoMng')">
									<span class="badge badge-roundless badge-important">new</span>照片列表
								</a>
							</li>
							<li>
								<a href="javascript:loadJsp('/photo/loadUpLoadPhoto')">
									<span class="badge badge-roundless badge-warning">new</span>上传照片
								</a>
							</li>
						</ul>
					</li>
					<li class="">
						<a href="javascript:;">
						<i class="fa fa-user"></i>
						<span class="title">
							权限管理
						</span>
						<span class="arrow ">
						</span>
						</a>
						<ul class="sub-menu">
							<li>
								<a href="javascript:loadJsp('/user/loadResetPassword')">
									<i class="fa fa-user-md"></i>
									<span class="badge badge-important">1</span>用户管理
								</a>
							</li>
							<li>
								<a href="javascript:loadJsp('/photo/loadUpLoadPhoto')">
									<i class="fa fa-heart"></i>
									<span class="badge badge-info">2</span>角色管理
								</a>
							</li>
							<li>
								<a href="javascript:loadJsp('/photo/loadUpLoadPhoto')">
									<i class="fa fa-folder-open"></i>
									<span class="badge badge-success">3</span>资源管理
								</a>
							</li>
						</ul>
					</li>
					<li class="">
						<a href="javascript:;">
						<i class="fa fa-envelope"></i>
						<span class="title">
							邮件管理
						</span>
						<span class="arrow ">
						</span>
						</a>
						<ul class="sub-menu">
							<li>
								<a href="javascript:loadJsp('/photo/loadPhotoMng')">
									<span class="badge badge-roundless badge-important">new</span>我的收件箱
								</a>
							</li>
						</ul>
					</li>
				</ul>
				<!-- END SIDEBAR MENU -->
			</div>
		</div>
		<!-- END SIDEBAR -->
		
		<!-- BEGIN CONTENT -->
		<div class="page-content-wrapper">
			<div class="page-content">
				<!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
				<div class="modal fade" id="portlet-config" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
								<h4 class="modal-title">Modal title</h4>
							</div>
							<div class="modal-body">
								 Widget settings form goes here
							</div>
							<div class="modal-footer">
								<button type="button" class="btn blue">Save changes</button>
								<button type="button" class="btn default" data-dismiss="modal">Close</button>
							</div>
						</div>
						<!-- /.modal-content -->
					</div>
					<!-- /.modal-dialog -->
				</div>
				<!-- /.modal -->
				<!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
				
				<!-- BEGIN STYLE CUSTOMIZER -->
				<div class="theme-panel hidden-xs hidden-sm">
					<div class="toggler">
					</div>
					<div class="toggler-close">
					</div>
					<div class="theme-options">
						<div class="theme-option theme-colors clearfix">
							<span>
								THEME COLOR
							</span>
							<ul>
								<li class="color-black current color-default" data-style="default">
								</li>
								<li class="color-blue" data-style="blue">
								</li>
								<li class="color-brown" data-style="brown">
								</li>
								<li class="color-purple" data-style="purple">
								</li>
								<li class="color-grey" data-style="grey">
								</li>
								<li class="color-white color-light" data-style="light">
								</li>
							</ul>
						</div>
						<div class="theme-option">
							<span>
								Layout
							</span>
							<select class="layout-option form-control input-small">
								<option value="fluid" selected="selected">Fluid</option>
								<option value="boxed">Boxed</option>
							</select>
						</div>
						<div class="theme-option">
							<span>
								Header
							</span>
							<select class="header-option form-control input-small">
								<option value="fixed" selected="selected">Fixed</option>
								<option value="default">Default</option>
							</select>
						</div>
						<div class="theme-option">
							<span>
								Sidebar
							</span>
							<select class="sidebar-option form-control input-small">
								<option value="fixed">Fixed</option>
								<option value="default" selected="selected">Default</option>
							</select>
						</div>
						<div class="theme-option">
							<span>
								Sidebar Position
							</span>
							<select class="sidebar-pos-option form-control input-small">
								<option value="left" selected="selected">Left</option>
								<option value="right">Right</option>
							</select>
						</div>
						<div class="theme-option">
							<span>
								Footer
							</span>
							<select class="footer-option form-control input-small">
								<option value="fixed">Fixed</option>
								<option value="default" selected="selected">Default</option>
							</select>
						</div>
					</div>
				</div>
				<!-- END STYLE CUSTOMIZER -->
				
				<!-- BEGIN PAGE HEADER-->
				<div class="row">
					<div class="col-md-12">
						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<h3 class="page-title">
							星玲之约 <small></small>
						</h3>
						<ul class="page-breadcrumb breadcrumb">
							<li>
								<i class="fa fa-home"></i>
								<a href="javascript:void(0);">后台管理</a>
								<i class="fa fa-angle-right"></i>
							</li> 
							<li>
								<a href="javascript:void(0);">后台面板</a>
							</li>
							<li class="pull-right">
								<div id="dashboard-report-range" class="dashboard-date-range tooltips" data-placement="top" data-original-title="Change dashboard date range">
									<i class="fa fa-calendar"></i>
									<span>
									</span>
									<i class="fa fa-angle-down"></i>
								</div>
							</li>
						</ul>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>
				<!-- END PAGE HEADER-->
				<div id="content">
					<div class="clearfix">
					</div>
					<div class="clearfix">
					</div>
				</div>
			</div>
		</div>
		<!-- END CONTENT -->
	</div>
	<!-- END CONTAINER -->
	<div class="footer">
		<div class="footer-inner">
			 2016 &copy; XingLingLove by YangWenSheng.
		</div>
		<div class="footer-tools">
			<span class="go-top">
				<i class="fa fa-angle-up"></i>
			</span>
		</div>
	</div>

	<!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
	<div class="modal fade" id="msgModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">提示信息</h4>
				</div>
				<div class="modal-body">
					 <span id="msgText"></span>
				</div>
				<div class="modal-footer">
					<!-- <button type="button" class="btn blue">Save changes</button> -->
					<button type="button" class="btn default" data-dismiss="modal">关闭</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->
	<script src="/assets/plugins/jquery-1.10.2.min.js" type="text/javascript"></script>
	<script src="/assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="/assets/plugins/bootstrap-hover-dropdown/twitter-bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
	<script src="/assets/plugins/jquery.cokie.min.js" type="text/javascript"></script>
	<script src="/assets/plugins/bootstrap-daterangepicker/moment.min.js" type="text/javascript"></script>
	<script src="/assets/plugins/bootstrap-daterangepicker/daterangepicker.js" type="text/javascript"></script>
	<script src="/assets/plugins/fullcalendar/fullcalendar/fullcalendar.min.js" type="text/javascript"></script>
	<script src="/assets/plugins/jquery.sparkline.min.js" type="text/javascript"></script>
	<script src="/assets/scripts/app.js" type="text/javascript"></script>
	<script src="/assets/scripts/index.js" type="text/javascript"></script>
	<script src="/assets/plugins/sweetalert/sweetalert.min.js"></script>
	<script type="text/javascript" src="/assets/plugins/zDialog/js/zDrag.js"></script>
	<script type="text/javascript" src="/assets/plugins/zDialog/js/zDialog.js"></script>
	
	<script>
	jQuery(document).ready(function() {    
	   App.init(); // initlayout and core plugins
	   Index.init();
	   Index.initCalendar(); 
	   Index.initDashboardDaterange();
	   Index.initIntro();
	   
	    var num = 0;
		$(document).ready(function(){
		  $("body").mousemove(function(event){
		    var pageX = event.pageX;
		    var pageY = event.pageY;
		    var arr = $(".panel-custom");
		    num++;  
		    var box = "<img src='/img/star.png' id='ball"+num+"' style='position:absolute;top:"+(pageY+10)+"px;left:"+(pageX+10)+"px;border-radius:5px;width:15px;height:15px'/>";
		    $("body").append(box);    
		    $("#ball"+num).animate({width:"0px",height:"0px"},1000,function(){       
		       $("#ball"+num).remove();
		    });    
		  });
		});
	});
	</script>
	
	</body>
	<!-- END BODY -->
</html>
