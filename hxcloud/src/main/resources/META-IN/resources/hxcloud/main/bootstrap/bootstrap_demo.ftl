<html>
<head>
<meta charset="utf-8">
<title>${title}</title>
</head>
<link rel="stylesheet" type="text/css" href="${contextPath!}/css/coolblue/xhui.css" />
<body>
<div class="xhui-layout-container">
    <div class="eui-layout-container" id="container"></div>
</div>
</body>
<script>
	var $contextPath = '${contextPath!}';
</script>
<script src="${contextPath!}/webjars/jquery/3.1.1/jquery.min.js"></script>  
<script src="${contextPath!}/webjars/bootstrap/3.3.5/js/bootstrap.min.js"></script> 
<link rel="stylesheet" href="${contextPath!}/webjars/bootstrap/3.3.5/css/bootstrap.min.css" />

<script src="${contextPath!}/third/require.js"></script>
<script>
    require.config({
		baseUrl: '${contextPath!}'
     });
	require(['..${contextPath!}main/bootstrap/js/bootstrap_demo'], function (bsdemo){
		var demo = new bsdemo.BootStrapDemo({
			wnd:window,
			container:document.getElementById("container")
		});
	});
</script>

</html>