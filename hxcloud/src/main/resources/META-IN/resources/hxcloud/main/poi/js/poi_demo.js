define(["third/echarts.min"], function(echarts) {   
	"use strict"

    
	/**
	 * POI例页面
	 * 1.上传Excel文件被后台解析
	 */
	function POIDemo(options) {
		this.wnd = options.wnd || window;
		this.doc = this.wnd.document;
		this.container = options.container;
		this.initPage(); // 初始化界面
	}
    
	/**
	 * 销毁方法
	 */
	POIDemo.prototype.dispose = function() {
		this.wnd = null;
		this.doc = null;
		this.container = null;
	}
	
	
    /**
     * 初始化界面
     */
	POIDemo.prototype.initPage = function() {
		this.initUI();	   //初始化界面	框架
	} 
	
	/**
	 * 定义界面结构
	 */
	POIDemo.prototype.initUI = function() {
		var self = this;
		var htmlStr = [];
		htmlStr.push('<input type="file" id="file" name="myfile" />');
		htmlStr.push('<input type="button" onclick="UpladFile()" value="上传" />');
		htmlStr.push('<button type="button" id="myStateButton" data-complete-text="finished!" class="btn btn-primary" autocomplete="off">按钮</button>');
		this.container.innerHTML = htmlStr.join("");
		var button = this.doc.getElementById("myStateButton");
		button.onclick = function(){
			self.UpladFile();
		}
// 		此为一种获取后台数据的办法
//		$.get("http://127.0.0.1:8888//excel/import", function(data) {
//	   		alert(data);
//		});
	}
	
	//上传文件方法
	POIDemo.prototype.UpladFile = function() {
        var fileObj = this.doc.getElementById("file").files[0]; // js 获取文件对象
        if(!fileObj){
        	alert("上传表格文件不得为空");
        	return;
        }
        var type = fileObj.name.split(".")[1];
        XHUI.post({
        	action : "/excel/import",
        	datas:{
        		type: type,
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
		POIDemo : POIDemo
	}
});