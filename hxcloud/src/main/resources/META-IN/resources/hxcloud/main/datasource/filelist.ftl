<html>
<head>
<meta charset="utf-8">
<title>首页 </title>
</head>
<link rel="stylesheet" type="text/css" href="/css/coolblue/xhui.css" />
<link rel="stylesheet" href="/webjars/bootstrap/3.3.5/css/bootstrap.min.css" />
<link href="/third/webjars/bootstrap-table.css" rel="stylesheet">
<body>
	<div class="xhui-layout-container" id="filelist_container">
</div>
</body>

<script src="/webjars/jquery/3.1.1/jquery.min.js"></script>  
<script src="/webjars/bootstrap/3.3.5/js/bootstrap.min.js"></script> 

<script src="/util/xhui.js"></script>
<script src="/third/webjars/bootstrap-table.js"></script>
<script src="/third/webjars/bootstrap-table-zh-CN.min.js"></script>
<script src="/third/require.js"></script>

<script>
	require(['../main/datasource/js/filelist'], function (ListFrame){
		var frame = new ListFrame.FileList({
			wnd:window,
			container: document.getElementById("filelist_container")
		});
	});
</script>
</html>