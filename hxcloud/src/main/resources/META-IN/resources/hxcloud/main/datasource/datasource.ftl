<html>
<head>
<meta charset="utf-8">
<title>首页 </title>
</head>
<link rel="stylesheet" type="text/css" href="${contextPath!}css/coolblue/xhui.css" />
<body>
<div class="xhui-layout-body" id="container">
</div>
</body>
<script>
	var $contextPath = '${contextPath!}';
</script>
<script src="${contextPath!}util/xhui.js"></script>
<script src="${contextPath!}third/require.js"></script>
<script src="${contextPath!}third/jquery-1.9.1.min.js"></script>
<script>
    require.config({
		baseUrl: '${contextPath!}'
     });
	require(['..${contextPath!}main/datasource/js/datasource'], function (SourceFrame){
		var frame = new SourceFrame.DataSource({
			wnd:window,
			container: document.getElementById("container")
		});
	});
</script>
</html>