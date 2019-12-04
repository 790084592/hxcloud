define(["third/echarts.min"], function(echarts) {   
	"use strict"

    
	/**
	 * 数据源页面
	 */
	function DataSource(options) {
		this.wnd = options.wnd || window;
		this.doc = this.wnd.document;
		this.container = options.container;
		this.initPage(); // 初始化界面
	}
    
	/**
	 * 销毁方法
	 */
	DataSource.prototype.dispose = function() {
		this.wnd = null;
		this.doc = null;
		this.container = null;
	}
	
	
    /**
     * 初始化界面
     */
	DataSource.prototype.initPage = function() {
		this.initUI();	   //初始化界面框架
		this.initLeftPanel(); //绑定左侧界面事件
	} 
	
	/**
	 * 定义界面结构
	 */
	DataSource.prototype.initUI = function() {
		var waitTitle = "加载中...";
		var htmlStr = [];
		//左侧
		htmlStr.push('<div class="xhui-layout-left-tab" style=";background: #1c1541;">');
		htmlStr.push('	<div class="xhui-coolbar-container xhui-coolbar-verticaltab" _selectabletype_="false" style="user-select: none;">');
		htmlStr.push('		<ul id="iconpage" class="xhui-coolbar-group">');
		htmlStr.push('			<li id="conndatasource" class="xhui-coolbar-item xhui-coolbar-item-group xhui-coolbar-item-group-first">');
		htmlStr.push('				<i class="xhui-icon">&#xe774</i><span class="xhui-coolbar-item-text">连接池<br>管理</span>');
		htmlStr.push('			</li>');
		htmlStr.push('			<li id="filedatasource" class="xhui-coolbar-item xhui-coolbar-item-group xhui-coolbar-item-group-last xhui-coolbar-active" style="">');
		htmlStr.push('				<i class="xhui-icon">&#xef9d</i><span class="xhui-coolbar-item-text">文件<br>数据源</span>');
		htmlStr.push('			</li>');
		htmlStr.push('			<li class="xhui-coolbar-line"></li>');
		htmlStr.push('		</ul>');
		htmlStr.push('	</div>');
		htmlStr.push('</div>');
		//右侧
		htmlStr.push('<div class="xhui-layout-content-tab xhui-tab-addnav ">');
		htmlStr.push('	<div class="xhui-layout-container">');
		htmlStr.push('		<div class="xhui-layout-row-1 xhui-layout-row-first xhui-padding-right-20 xhui-layout-nav">' + "面包屑 /  文件数据源" + '');
		htmlStr.push('		</div>');
		htmlStr.push('		<div class="xhui-layout-row-3 xhui-layout-row-offset-1 xhui-layout-row-last xhui-card-container-bg">');	
		htmlStr.push('				<iframe id="fileframe" style="width:100%; height:100%" frameborder="0" marginheight="0" marginwidth="0" allowfullscreen="true"></iframe>');
		htmlStr.push('		</div>');
		htmlStr.push('	</div>');
		htmlStr.push('</div>');
		this.container.innerHTML = htmlStr.join("");
		this.mainFrame = this.doc.getElementById("fileframe");
	}
	
	DataSource.prototype.initLeftPanel = function() {
		var self = this;
		this.fileListBtn = this.doc.getElementById("filedatasource");
		this.fileListBtn.onclick = function(){
			self.mainFrame.src = XHUI.getContextPath() + "datasource/filelist";
		}
	}
	
	DataSource.prototype.initRightPanel = function() {
		
	}

	return {
		DataSource : DataSource
	}
});