define(["third/echarts.min"], function(echarts) {   
	"use strict"

    
	/**
	 * 数据集页面
	 */
	function DataSubject(options) {
		this.wnd = options.wnd || window;
		this.doc = this.wnd.document;
		this.container = options.container;
		this.initPage(); // 初始化界面
	}
    
	/**
	 * 销毁方法
	 */
	DataSubject.prototype.dispose = function() {
		this.wnd = null;
		this.doc = null;
		this.container = null;
	}
	
	
    /**
     * 初始化界面
     */
	DataSubject.prototype.initPage = function() {
		this.initUI();	   //初始化界面	框架
	} 
	
	/**
	 * 定义界面结构
	 */
	DataSubject.prototype.initUI = function() {
		var htmlStr = [];
		htmlStr.push('<div class="xhui-panelsplitter-container" style="width: 100%; height: 100%; cursor: e-resize;">');
		htmlStr.push('	<div class="xhui-layout-left-darkcolour xhui-layout-left xhui-panelsplitter-panel xhui-panelsplitter-panel-left" style="width: 220px;background-color: #3b4966;" id="leftPanel"></div>');
		htmlStr.push('	<div class="xhui-panelsplitter-btn xhui-container-bgcolor" style="width: 4px; cursor: e-resize; left: 220px;" id="centerLine"></div>');
		htmlStr.push('	<div class="xhui-layout-content xhui-panelsplitter-panel xhui-panelsplitter-panel-right xhui-tab-addnav  xhui-tab-addcopyright" style="left: 224px;" id="rightPanel"></div>');
		htmlStr.push('</div>');
		this.container.innerHTML = htmlStr.join("");
		var self = this;
		var leftPanel = this.leftPanel = this.doc.getElementById("leftPanel");
		var centerLine = this.centerLine = this.doc.getElementById("centerLine");
		var rightPanel = this.rightPanel = this.doc.getElementById("rightPanel");
		var $move = $(centerLine).bind ('mousedown', function (_event) {
            var event = _event || self.wnd.event;
            var disX = event.offsetX;
            var disY = event.offsetY;
            self.doc.onmousemove = function (_event) { //整个高级查询框移动
                var event = _event || self.wnd.event;
                var iL = event.clientX - disX;  //获取left
                var iT = event.clientY - disY;  //获取top
                //改变元素的位置   
                leftPanel.style.cssText += ";width: " + iL + "px;";
                centerLine.style.cssText += ";left: " + iL + "px;";
                rightPanel.style.cssText += ";left: " + (iL+6) + "px;";
                return false;
            };
            self.doc.onmouseup = function () {
            	self.doc.onmousemove = null;
            	self.doc.onmouseup = null;
            };
            return false;
		});
	}
	
	DataSubject.prototype.initLeftPanel = function() {
		
	}
	
	DataSubject.prototype.initRightPanel = function() {
		
	}

	return {
		DataSubject : DataSubject
	}
});