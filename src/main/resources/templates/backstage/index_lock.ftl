<html lang="en" class="no-js">

	<head>
			<meta charset="utf-8"/>
			<title>密码重置</title>
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
			<meta content="" name="description"/>
			<meta content="" name="author"/>
			<meta name="MobileOptimized" content="320">
			<!-- BEGIN GLOBAL MANDATORY STYLES -->
			<link href="/assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
			<link href="/assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
			<link href="/assets/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
			<link href="/assets/css/style-metronic.css" rel="stylesheet" type="text/css"/>
			<link rel="stylesheet" type="text/css" href="/assets/plugins/select2/select2_metro.css"/>
			<link href="/assets/css/style.css" rel="stylesheet" type="text/css"/>
			<link href="/assets/css/style-responsive.css" rel="stylesheet" type="text/css"/>
			<link href="/assets/css/themes/default.css" rel="stylesheet" type="text/css" id="style_color"/>
			<link rel="stylesheet" type="text/css" href="/assets/plugins/sweetalert/sweetalert.css">
			<link href="/assets/css/pages/lock.css" rel="stylesheet" type="text/css"/>
			<link rel="shortcut icon" href="/favicon.ico"/>
	</head>
<body>

<div class="page-lock">
	<div class="page-logo">
		<a class="brand" href="index.html">
		<img src="/assets/img/logo-big.png" alt="logo"/>
		</a>
	</div>
	<div class="page-body">
		<img class="page-lock-img" src="/assets/img/profile/profile.jpg" alt="">
		<div class="page-lock-info">
			<h1>Bob Nilson</h1>
			<span class="email">
				 bob@keenthemes.com
			</span>
			<span class="locked">
				 Locked
			</span>
			<form class="form-inline" action="/sys/showBackStage">
				<div class="input-group input-medium">
					<input type="text" class="form-control" placeholder="Password">
					<span class="input-group-btn">
						<button type="submit" class="btn blue icn-only"><i class="m-icon-swapright m-icon-white"></i></button>
					</span>
				</div>
				<!-- /input-group -->
				<div class="relogin">
					<a href="">Not Bob Nilson ?</a>
				</div>
			</form>
		</div>
	</div>
</div>
<script src="/assets/plugins/jquery-1.10.2.min.js" type="text/javascript"></script>
<script src="/assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/assets/plugins/jquery.cokie.min.js" type="text/javascript"></script>
<script src="/assets/plugins/jquery-validation/dist/jquery.validate.min.js" type="text/javascript"></script>
<script src="/assets/plugins/backstretch/jquery.backstretch.min.js" type="text/javascript"></script>
<script type="text/javascript" src="/assets/plugins/select2/select2.js"></script>
<script src="/assets/scripts/app.js" type="text/javascript"></script>
<script src="/assets/scripts/login-soft.js" type="text/javascript"></script>
<script src="/assets/plugins/sweetalert/sweetalert.min.js"></script>
			
<script>

	jQuery(document).ready(function() {     
	  App.initOfResetPwd();
	  Login.initOfResetPwd();
	});
	
</script>
</body>
</html>