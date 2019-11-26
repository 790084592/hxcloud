<html>
<head>
<meta charset="utf-8">
<title>首页 </title>
</head>
<link rel="stylesheet" type="text/css" href="/css/coolblue/xhui.css" />
<body>
<div class="xhui-layout-body" id="container">
</div>
</body>
<script src="/third/require.js"></script>
<script src="/third/jquery-1.9.1.min.js"></script>
<script>
	require(['../main/datasubject/js/datasubject'], function (SourceFrame){
		var frame = new SourceFrame.DataSubject({
			wnd:window,
			container: document.getElementById("container")
		});
	});
</script>
</html>