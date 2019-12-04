<html>
<head>
<meta charset="utf-8">
<title>首页 </title>
</head>
<link rel="stylesheet" type="text/css" href="${contextPath!}css/coolblue/xhui.css" />
<link rel="stylesheet" href="${contextPath!}webjars/bootstrap/3.3.5/css/bootstrap.min.css" />
<body>
<div class="xhui-layout-body">
	<div class="xhui-layout-container">
	    <div class="xhui-layout-header" id="header"></div>
	    <div class="xhui-layout-main" id="container"></div>
	</div>
</div>
</body>
<script>
	var $contextPath = '${contextPath!}';
</script>
<script src="${contextPath!}webjars/jquery/3.1.1/jquery.min.js"></script>  
<script src="${contextPath!}webjars/bootstrap/3.3.5/js/bootstrap.min.js"></script> 
<script src="${contextPath!}util/xhui.js"></script>
<script src="${contextPath!}third/require.js"></script>
<script src="${contextPath!}third/jquery-1.9.1.min.js"></script>
<script>
	require.config({
		baseUrl: '${contextPath!}'
    });
	require(['..${contextPath!}main/js/mainframe'], function (frame){
		var demo = new frame.MainFrame({
			wnd:window,
			header: document.getElementById("header"),
			container: document.getElementById("container")
		});
	});
</script>
</html>