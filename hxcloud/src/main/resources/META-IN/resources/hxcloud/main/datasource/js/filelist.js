define(["third/echarts.min"], function(echarts) {   
	"use strict"

    
	/**
	 * 数据源页面
	 */
	function FileList(options) {
		this.wnd = options.wnd || window;
		this.doc = this.wnd.document;
		this.container = options.container;
		this.initPage(); // 初始化界面
	}
    
	/**
	 * 销毁方法
	 */
	FileList.prototype.dispose = function() {
		this.wnd = null;
		this.doc = null;
		this.container = null;
		this.toolbar = null;
		this.list = null;
		this.addbtn = null;
	}
	
	
    /**
     * 初始化界面
     */
	FileList.prototype.initPage = function() {
		this.initUI();	    //初始化界面框架
		this.initToolBar(); //初始化顶部工具栏
		this.initAddDataSourceDlg(); //初始化新建数据源对话框
	} 
	
	/**
	 * 定义界面结构
	 */
	FileList.prototype.initUI = function() {
		var htmlStr = [];
		htmlStr.push('<div id="toolbar" class="xhui-layout-row-1 xhui-layout-row-first xhui-layout-nav">');
		htmlStr.push('</div>');
		htmlStr.push('<div class="xhui-layout-row-3 xhui-layout-row-offset-1 xhui-layout-row-last xhui-layout-row-offsetbottom-2list ">');	
		htmlStr.push('	<table id="filelist" class="table table-hover "></table>');
		htmlStr.push('</div>');
		this.container.innerHTML = htmlStr.join("");

		this.toolbar = this.doc.getElementById("toolbar");
		this.list = $('#filelist');
		var listWidth = this.toolbar.offsetWidth;
		this.list.bootstrapTable({
			cache: false,
			theadClasses: "thead-gray",//这里设置表头样式
		    classes: "table table-hover",
			pagination: true, 
			url: XHUI.getContextPath() + "datasource/listFileDataSource", 
			sidePagination: "server",
			pageList:[1,2,10,50,100],
			pageSize: 100,                     //每页的记录行数（*）
			queryParams : function (params) {
				//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
				var temp = {   
				pageSize: params.limit,                         //页面大小
				pageIndex: (params.offset / params.limit) + 1,   //页码
				sort: params.sort,      //排序列名  
				sortOrder: params.order //排位命令（desc，asc） 
				};
				return temp;
			},
			columns: [
				{
					checkbox: true,  
					visible: true       //是否显示复选框  
				},{
					field: 'id',
					title: "数据源标题",
					width: listWidth/5
				},{
					field: 'caption',
					title: "文件名称",
					width: listWidth/5
				}, {
					field: "type",
					title: "文件类型",
					width: listWidth/5,
					formatter: function(value, row, index){
						var result = value==0? "EXCEL":"其他";
						return result;
					}
				}, {
					field: "createTime",
					title: "上传时间",
					width: listWidth/5
				},{
					field: 'oper',
					title: "操作",
					width: 2*listWidth/5,
					formatter: function(value, row, index){
						var id = value;
						var result = "";
						result += "<a href='javascript:;' class='btn btn-xs green' onclick=\"EditViewById('" + id + "', view='view')\" title='查看'><span class='glyphicon glyphicon-search'></span></a>";
						result += "<a href='javascript:;' class='btn btn-xs blue' onclick=\"EditViewById('" + id + "')\" title='编辑'><span class='glyphicon glyphicon-pencil'></span></a>";
						result += "<a href='javascript:;' class='btn btn-xs red' onclick=\"DeleteByIds('" + id + "')\" title='删除'><span class='glyphicon glyphicon-remove'></span></a>";
						return result;
					}
				}
			]});
	}
	
	FileList.prototype.initLeftPanel = function() {
		
	}
	
	/**
	 * 初始化，顶部工具栏按钮
	 */
	FileList.prototype.initToolBar = function() {
		var htmlStr = [];
		htmlStr.push('	<div class="btn-group">');
		htmlStr.push('		<button type="button" class="btn btn-default dropdown-toggle xhui-link" style=";border:1px solid #4122eb;" data-toggle="dropdown">新建');
		htmlStr.push('     		<span class="caret"></span>');
		htmlStr.push('		 </button>');
		htmlStr.push('		 <ul class="dropdown-menu">');
		htmlStr.push('     		<li role="presentation">');
		htmlStr.push(' 				<a id="addbutton" role="menuitem" tabindex="-1" href="#">Excel</a>');
        htmlStr.push(' 			</li>');
		htmlStr.push('     		<li role="presentation" class="divider"></li>');
		htmlStr.push('     		<li role="presentation">');
		htmlStr.push(' 				<a id="otherbutton" role="menuitem" tabindex="-1" href="#">其他</a>');
        htmlStr.push(' 			</li>');
		htmlStr.push(' 		</ul>');
		htmlStr.push('	</div>');
		htmlStr.push('	<button type="button" class="btn btn-default xhui-link" style=";border:1px solid #4122eb;">删除</button>');
		htmlStr.push('	<button id="refreshbtn" type="button" class="btn btn-default xhui-link" style=";border:1px solid #4122eb;">刷新</button>');
		this.toolbar.innerHTML = htmlStr.join("");
		this.addbtn = this.doc.getElementById("addbutton");
		this.refreshbtn = this.doc.getElementById("refreshbtn");
		this.refreshbtn.onclick = function(){
			$('#filelist').bootStrapTable('refresh');
		};
	}
	
	/**
	 * 初始化，新建数据源对话框
	 */
	FileList.prototype.initAddDataSourceDlg = function() {
		var self = this;
		//建立在iframe之外，实现模态背景的最大化
		var basedoc = this.wnd.parent.parent.document;
		var h = basedoc.body.offsetHeight; //对话框高度位置调整
		var model = this.doc.createElement("div");
		var modelHtml = [];
		modelHtml.push('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="false">');
		modelHtml.push('<div class="modal-dialog" style=";top:' + (h-173.3)/2 + 'px;">');
		modelHtml.push('    <div class="modal-content">');
		modelHtml.push('        <div class="modal-header">');
		modelHtml.push('             <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
		modelHtml.push('            <h4 class="modal-title" id="myModalLabel">新建文件数据源</h4>');
		modelHtml.push('        </div>');
		modelHtml.push('        <div class="modal-body form-group">');
		modelHtml.push('        	<div class="form-group">');
		modelHtml.push('        		<form class="bs-example bs-example-form" role="form">');
		modelHtml.push('        			<div class="col-sm-2 control-label">选择文件</div>');
		modelHtml.push('        	 		<div class="col-sm-6">');
		modelHtml.push('        	  	  		<div class="input-group">');
		modelHtml.push('        	   	    		<input id="location" class="form-control">');
		modelHtml.push('        	   	      	  <label class="input-group-btn">');
		modelHtml.push('        	  	       	     	<input type="button" id="i-check" value="上传"  class="btn btn-primary" onclick="$(\'#i-file\').click();">');
		modelHtml.push('        	  	      	  	</label>');
		modelHtml.push('        	  	 		</div>');
		modelHtml.push('        			</div>');
		modelHtml.push('        			<input type="file" name="file" id="i-file"  accept=".xls, .xlsx" onchange="$(\'#location\').val($(\'#i-file\').val());"  style="display: none">');
		modelHtml.push('        			<br>');
		modelHtml.push('        		</form>');
		modelHtml.push('			</div>');
		modelHtml.push('		</div>');
		modelHtml.push('        <div class="modal-footer">');
		modelHtml.push('            <button id="doaddExcel" type="button" class="btn btn-primary">确定</button>');
		modelHtml.push('            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>');
		modelHtml.push('        </div>');
		modelHtml.push('    </div><!-- /.modal-content -->');
		modelHtml.push('</div><!-- /.modal -->');
		modelHtml.push('</div>');
		modelHtml.push('<div class="modal-backdrop fade in xhui-hide"></div>');
	    model.innerHTML = modelHtml.join("");
	    basedoc.body.appendChild(model);
	    this.addbtn.onclick = function(){
	    	$(model.firstChild).modal('show');
	    	//显示模态背景
	    	model.lastChild.className = model.lastChild.className.replace("xhui-hide", "");
	    }
	    //关闭对话框，触发事件
	    $(model.firstChild).on('hide.bs.modal', function () {
	    	model.lastChild.className += " xhui-hide "; //隐藏模态背景
	    });
	    //对话框，确定按钮的点击事件
	    var addExcelBtn = basedoc.getElementById("doaddExcel");
	    addExcelBtn.onclick = function(){
	    	self.UpladFile();
	    	 $(model.firstChild).modal('hide')
	    }
	}
	
	//上传文件方法
	FileList.prototype.UpladFile = function() {
        var fileObj = this.wnd.parent.parent.document.getElementById("i-file").files[0]; // js 获取文件对象
        if(!fileObj){
        	alert("上传表格文件不得为空");
        	return;
        }
        var fileNames = fileObj.name.split(".");
        if(fileNames[1]!="xls" && fileNames[1]!="xlsx"){
        	alert("请确保上传的Excel文件为xls或xlsx格式！");
        	return;
        }
        XHUI.post({
        	action : XHUI.getContextPath() + "datasource/uploadDataSource",
        	datas:{
        		type: 0,
        		fileName: fileNames[0],
        		tag : fileNames[1],
        		file: fileObj
        	},
        	callback: function(evt){
        		var data = evt.target.responseText;
                if(data){
                	 alert("上传成功！\n" + data);
                }else{
                	alert("上传失败1！");
                }
        	},
        	error:function(evt) {
            	alert("上传失败2！");
            }
        });
    }

	return {
		FileList : FileList
	}
});