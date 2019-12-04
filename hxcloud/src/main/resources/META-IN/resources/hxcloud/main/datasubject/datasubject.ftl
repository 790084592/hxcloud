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
<script src="${contextPath!}third/require.js"></script>
<script src="${contextPath!}third/jquery-1.9.1.min.js"></script>
<script>
    require.config({
		baseUrl: '${contextPath!}'
    });
	require(['..${contextPath!}main/datasubject/js/datasubject'], function (SourceFrame){
		var frame = new SourceFrame.DataSubject({
			wnd:window,
			container: document.getElementById("container")
		});
	});
</script>
</html>