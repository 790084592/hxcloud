define(["third/echarts.min"], function(echarts) {   
	"use strict"

    
	/**
	 * bootstrap示例页面
	 * 1.暂时只尝试了按钮
	 */
	function BootStrapDemo(options) {
		this.wnd = options.wnd || window;
		this.doc = this.wnd.document;
		this.container = options.container;
		this.initPage(); // 初始化界面
	}
    
	/**
	 * 销毁方法
	 */
	BootStrapDemo.prototype.dispose = function() {
		this.wnd = null;
		this.doc = null;
		this.container = null;
	}
	
	
    /**
     * 初始化界面
     */
	BootStrapDemo.prototype.initPage = function() {
		this.initUI();	   //初始化界面	框架
	} 
	
	/**
	 * 定义界面结构
	 */
	BootStrapDemo.prototype.initUI = function() {
		var htmlStr = [];
		htmlStr.push('<button type="button" id="myStateButton" data-complete-text="finished!" class="btn btn-primary" autocomplete="off">按钮</button>');
		this.container.innerHTML = htmlStr.join("");
		var button = this.doc.getElementById("myStateButton");
		button.onclick = function(){
			alert("pressed");
		}
	}
	
	return {
		BootStrapDemo : BootStrapDemo
	}
});