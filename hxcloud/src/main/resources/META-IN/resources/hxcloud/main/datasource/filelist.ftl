<html>
<head>
<meta charset="utf-8">
<title>首页 </title>
</head>
<link rel="stylesheet" type="text/css" href="${contextPath!}css/coolblue/xhui.css" />
<link rel="stylesheet" href="${contextPath!}webjars/bootstrap/3.3.5/css/bootstrap.min.css" />
<link href="${contextPath!}third/webjars/bootstrap-table.css" rel="stylesheet">
<body>
	<div class="xhui-layout-container" id="filelist_container">
</div>
</body>
<script>
	var $contextPath = '${contextPath!}';
</script>
<script src="${contextPath!}webjars/jquery/3.1.1/jquery.min.js"></script>  
<script src="${contextPath!}webjars/bootstrap/3.3.5/js/bootstrap.min.js"></script> 
<script src="${contextPath!}util/xhui.js"></script>
<script src="${contextPath!}third/webjars/bootstrap-table.js"></script>
<script src="${contextPath!}third/webjars/bootstrap-table-zh-CN.min.js"></script>
<script src="${contextPath!}third/require.js"></script>

<script>
    require.config({
		baseUrl: '${contextPath!}'
    });
	require(['${contextPath!}main/datasource/js/filelist.js'], function (ListFrame){
		var frame = new ListFrame.FileList({
			wnd:window,
			container: document.getElementById("filelist_container")
		});
	});
</script>
</html>