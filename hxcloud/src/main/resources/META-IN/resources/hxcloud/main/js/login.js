define(["third/echarts.min"], function(echarts) {   
	"use strict"

    
	/**
	 * 登录页面
	 * 1.登录和登出
	 * 2.伪装页面
	 */
	function LoginFrame(options) {
		this.wnd = options.wnd || window;
		this.doc = this.wnd.document;
		this.container = options.container;
		this.initPage(); // 初始化界面
	}
    
	/**
	 * 销毁方法
	 */
	LoginFrame.prototype.dispose = function() {
		this.wnd = null;
		this.doc = null;
		this.container = null;
		this.pineChartDom = null;
		this.barChartDom = null;
	}
	
	
    /**
     * 初始化界面
     */
	LoginFrame.prototype.initPage = function() {
		this.initUI();	   //初始化界面	框架
		this.initBarChart();       //初始化条形图
		this.initPieChart();	   //初始化饼图
	} 
	
	/**
	 * 定义界面结构
	 */
	LoginFrame.prototype.initUI = function() {
		var self = this;
		var htmlStr = [];
		var sizesTitle = "数据量";
		var countsTitle =  "记录行数";
		var nearLineResTitle = "近线归档资产";
		var offLineResTitle =  "离线归档资产";
		var desResTitle = "销毁资产";
		var pinTitle =  "归档资产分布";
		var waitTitle =  "正在加载...";
		
		htmlStr.push('<div class="xhui-height-max xhui-change-bg">');
		htmlStr.push('	<div class="xhui-layout-container" id="mainpage">');
		//第一行
		htmlStr.push('			<div class="xhui-row " style="height:25%;" id="line1">');
		htmlStr.push('				<div class="xhui-change-item xhui-align-center xhui-height-max xhui-relative">');
		htmlStr.push('		  			<div class="xhui-layout-row-1 xhui-layout-row-first xhui-padding-left-5 xhui-padding-right-10 " id="dataSetTimeTab">');
		htmlStr.push('	  	  			</div>');
		htmlStr.push('		  			<div class="xhui-layout-row-3 xhui-layout-row-last xhui-padding-top-5 xhui-padding-left-10 xhui-padding-right-10 xhui-top-30 " id="container1">');
		//近线归档资产
		htmlStr.push('	  					<div class="xhui-col-xl-4 xhui-height-max xhui-padding-top-5 " id="line1">');
		htmlStr.push('							<div class="xhui-change-item xhui-align-center xhui-height-max xhui-relative" style="border-radius:0px;border-right:1px solid #f0f0f0;">');
		htmlStr.push('								<div class="xhui-layout-row-1 xhui-layout-row-first xhui-padding-top-5 xhui-padding-left-25 xhui-title">');
		htmlStr.push('									<img src="images/safe_jx.png" class=" xhui-float-left xhui-padding-right-5"/>');
		htmlStr.push('									<label >' + nearLineResTitle +'</label>');
		htmlStr.push('								</div>');
		htmlStr.push('								<div class="xhui-layout-row-3 xhui-layout-row-last xhui-row xhui-padding-bottom-10 xhui-top-30" id="container1-1">');
		htmlStr.push('									<div class="xhui-col-xl-6 xhui-height-max xhui-align-center" style="border-right:1px solid #f0f0f0;">');
		htmlStr.push('										<div class="lc-align-center ">');
		htmlStr.push('											<div class="xhui-blue-num-text" id="near-size">30 B</div>');
		htmlStr.push('											<label>' + sizesTitle + '</label>');
		htmlStr.push('										</div>');
		htmlStr.push('									</div>');
		htmlStr.push('									<div class="xhui-col-xl-6 xhui-height-max xhui-align-center ">');
		htmlStr.push('										<div class="lc-align-center ">');
		htmlStr.push('											<div class="xhui-blue-num-text" id="near-count">24 行</div>');
		htmlStr.push('											<label>' + countsTitle + '</label>');
		htmlStr.push('										</div>');
		htmlStr.push('									</div>');
		htmlStr.push('								</div>');
		htmlStr.push('								<div class="xhui-change-item xhui-height-max xhui-hide xhui-align-center xhui-weaken" id="wait-container1-1">');
		htmlStr.push('									<div class="xhui-wait">');
		htmlStr.push('										<i class="xhui-icon xhui-anim xhui-anim-rotate xhui-anim-loop">&#xefa1;</i><span>' + waitTitle + '</span>');
		htmlStr.push('									</div>');
		htmlStr.push('								</div>');
		htmlStr.push('							</div>');
		htmlStr.push('	  					</div>');
		//离线归档资产
		htmlStr.push('	  					<div class="xhui-col-xl-4 xhui-height-max xhui-padding-top-5">');
		htmlStr.push('							<div class="xhui-change-item xhui-align-center xhui-height-max xhui-relative" style="border-radius:0px;border-right:1px solid #f0f0f0;">');
		htmlStr.push('								<div class="xhui-layout-row-1 xhui-layout-row-first xhui-padding-top-5 xhui-padding-left-25 xhui-title">');
		htmlStr.push('									<img src="images/safe_lx.png" class=" xhui-float-left xhui-padding-right-5"/>');
		htmlStr.push('									<label>' + offLineResTitle + '</label>');
		htmlStr.push('								</div>');
		htmlStr.push('								<div class="xhui-layout-row-3 xhui-layout-row-last xhui-row xhui-padding-bottom-10 xhui-top-30" id="container1-2">');
		htmlStr.push('									<div class="xhui-col-xl-6 xhui-height-max xhui-align-center" style="border-right:1px solid #f0f0f0;">');
		htmlStr.push('										<div class="lc-align-center ">');
		htmlStr.push('											<div class="xhui-blue-num-text" id="off-size">342 B</div>');
		htmlStr.push('											<label>' + sizesTitle + '</label>');
		htmlStr.push('										</div>');
		htmlStr.push('									</div>');
		htmlStr.push('									<div class="xhui-col-xl-6 xhui-height-max xhui-align-center ">');
		htmlStr.push('										<div class="lc-align-center ">');
		htmlStr.push('											<div class="xhui-blue-num-text" id="off-count">56 行</div>');
		htmlStr.push('											<label>' + countsTitle + '</label>');
		htmlStr.push('										</div>');
		htmlStr.push('									</div>');
		htmlStr.push('								</div>');
		htmlStr.push('								<div class="xhui-change-item xhui-height-max xhui-hide xhui-align-center xhui-weaken" id="wait-container1-2">');
		htmlStr.push('									<div class="xhui-wait">');
		htmlStr.push('										<i class="xhui-icon xhui-anim xhui-anim-rotate xhui-anim-loop">&#xefa1;</i><span>' + waitTitle + '</span>');
		htmlStr.push('									</div>');
		htmlStr.push('								</div>');
		htmlStr.push('							</div>');
		htmlStr.push('	  					</div>');
		//销毁资产
		htmlStr.push('	  					<div class="xhui-col-xl-4 xhui-height-max xhui-padding-top-5">');
		htmlStr.push('							<div class="xhui-change-item xhui-align-center xhui-height-max xhui-relative">');
		htmlStr.push('								<div class="xhui-layout-row-1 xhui-layout-row-first xhui-padding-top-5 xhui-padding-left-25 xhui-title">');
		htmlStr.push('									<img src="images/safe_xh.png" class=" xhui-float-left xhui-padding-right-5"/>');
		htmlStr.push('									<label>' + desResTitle + '</label>');
		htmlStr.push('								</div>');
		htmlStr.push('								<div class="xhui-layout-row-3 xhui-layout-row-last xhui-row xhui-padding-bottom-10 xhui-top-30" id="container1-3">');
		htmlStr.push('									<div class="xhui-col-xl-6 xhui-height-max xhui-align-center" style="border-right:1px solid #f0f0f0;">');
		htmlStr.push('										<div class="lc-align-center ">');
		htmlStr.push('											<div class="xhui-blue-num-text" id="destory-size">6.82 KB</div>');
		htmlStr.push('											<label>' + sizesTitle + '</label>');
		htmlStr.push('										</div>');
		htmlStr.push('									</div>');
		htmlStr.push('									<div class="xhui-col-xl-6 xhui-height-max xhui-align-center ">');
		htmlStr.push('										<div class="lc-align-center ">');
		htmlStr.push('											<div class="xhui-blue-num-text" id="destory-count">154 行</div>');
		htmlStr.push('											<label>' + countsTitle + '</label>');
		htmlStr.push('										</div>');
		htmlStr.push('									</div>');
		htmlStr.push('								</div>');
		htmlStr.push('								<div class="xhui-change-item xhui-height-max xhui-hide xhui-align-center xhui-weaken" id="wait-container1-3">');
		htmlStr.push('									<div class="xhui-wait">');
		htmlStr.push('										<i class="xhui-icon xhui-anim xhui-anim-rotate xhui-anim-loop">&#xefa1;</i><span>' + waitTitle + '</span>');
		htmlStr.push('									</div>');
		htmlStr.push('								</div>');
		htmlStr.push('							</div>');
		htmlStr.push('	  					</div>');
		htmlStr.push('	  	  			</div>');
		htmlStr.push('					<div class="xhui-change-item xhui-height-max xhui-hide xhui-align-center xhui-weaken" id="wait-container1">');
		htmlStr.push('						<div class="xhui-wait">');
		htmlStr.push('							<i class="xhui-icon xhui-anim xhui-anim-rotate xhui-anim-loop">&#xefa1;</i><span>' + waitTitle + '</span>');
		htmlStr.push('						</div>');
		htmlStr.push('					</div>');
		htmlStr.push('				</div>');
		htmlStr.push('		</div>');
		//第二行
		htmlStr.push('			<div class="xhui-row " style="height:40%" id="line2">');
		htmlStr.push('	  			<div class="xhui-col-xl-12 xhui-padding-top-5 xhui-height-max">');
		htmlStr.push('					<div class="xhui-change-item xhui-align-center xhui-height-max xhui-relative">');
		htmlStr.push('		  				<div class="xhui-layout-row-1 xhui-layout-row-first xhui-padding-left-5 xhui-padding-right-10 " id="barChartTab">');
		htmlStr.push('	  	  				</div>');
		htmlStr.push('		  				<div class="xhui-layout-row-3 xhui-layout-row-last xhui-padding-top-15 xhui-padding-left-10 xhui-padding-right-10 xhui-top-30" id="container2"> ');
		htmlStr.push('	  						<div class="xhui-height-max" id="barchart"></div>');
		htmlStr.push('	  	  				</div>');
		htmlStr.push('						<div class="xhui-change-item xhui-height-max xhui-hide xhui-align-center xhui-weaken" id="wait-container2">');
		htmlStr.push('							<div class="xhui-wait">');
		htmlStr.push('								<i class="xhui-icon xhui-anim xhui-anim-rotate xhui-anim-loop">&#xefa1;</i><span>' + waitTitle + '</span>');
		htmlStr.push('							</div>');
		htmlStr.push('						</div>');
		htmlStr.push('					</div>');
		htmlStr.push('	  			</div>');
		htmlStr.push('			</div>');
		//第三行
		htmlStr.push('			<div class="xhui-row " style="height:35%" id="line3">');
		//近、离线归档
		htmlStr.push('	  			<div class="xhui-col-xl-4 xhui-padding-top-5 xhui-padding-right-5 xhui-height-max">');
		htmlStr.push('					<div class="xhui-change-item xhui-align-center xhui-height-max xhui-relative">');
		htmlStr.push('		  				<div class="xhui-layout-row-1 xhui-layout-row-first xhui-padding-left-5 xhui-padding-right-10 " id="lineAreaArchiveTab">');
		htmlStr.push('	  	  				</div>');
		htmlStr.push('		  				<div class="xhui-layout-row-3 xhui-layout-row-last xhui-padding-left-10 xhui-padding-right-10 xhui-top-30" id="container3-1">');
		htmlStr.push('	  						<div class="xhui-height-max xhui-padding-top-15" id="nearofflist"></div>');
		htmlStr.push('	  	  				</div>');
		htmlStr.push('						<div class="xhui-change-item xhui-height-max xhui-hide xhui-align-center xhui-weaken" id="wait-container3-1">');
		htmlStr.push('							<div class="xhui-wait">');
		htmlStr.push('								<i class="xhui-icon xhui-anim xhui-anim-rotate xhui-anim-loop">&#xefa1;</i><span>' + waitTitle + '</span>');
		htmlStr.push('							</div>');
		htmlStr.push('						</div>');
		htmlStr.push('					</div>');
		htmlStr.push('	  			</div>');
		//近线归档和销毁Top5
		htmlStr.push('	 			<div class="xhui-col-xl-4 xhui-padding-top-5 xhui-padding-left-5 xhui-height-max">');
		htmlStr.push('					<div class="xhui-change-item xhui-align-center xhui-height-max xhui-relative">');
		htmlStr.push('		  				<div class="xhui-layout-row-1 xhui-layout-row-first xhui-padding-left-5 xhui-padding-right-10 " id="top5Tab">');
		htmlStr.push('	  	  				</div>');
		htmlStr.push('		  				<div class="xhui-layout-row-3 xhui-layout-row-last xhui-padding-left-10 xhui-padding-right-10 xhui-top-30" id="container3-2">');
		htmlStr.push('	  						<div class="xhui-height-max xhui-padding-top-15" id="toplist">');
		
		htmlStr.push('								<div class="xhui-form-item">');
		//htmlStr.push('									<label class="xhui-form-label xhui-form-required">账号：</label>');
		htmlStr.push('									<div class="xhui-input-block"><input type="text" class="xhui-form" value="" id="account"></div>');
		htmlStr.push('									<div class="xhui-form-mid xhui-input-block xhui-clear xhui-hide">');
		htmlStr.push('										<div class="xhui-tips-container xhui-error" id="dbuserdlg_systemname_tips" ></div>');
		htmlStr.push('									</div>');
		htmlStr.push('								</div>');
		htmlStr.push('								<div class="xhui-form-item">');
		//htmlStr.push('									<label class="xhui-form-label xhui-form-required">密码：</label>');
		htmlStr.push('									<div class="xhui-input-block"><input type="password" class="xhui-form" value="" id="password"></div>');
		htmlStr.push('									<div class="xhui-form-mid xhui-input-block xhui-clear xhui-hide">');
		htmlStr.push('										<div class="xhui-tips-container xhui-error" id="dbuserdlg_systemname_tips" ></div>');
		htmlStr.push('									</div>');
		htmlStr.push('								</div>');
		htmlStr.push('								<div class="xhui-form-item">');
		htmlStr.push('										<button type="button" id="loginButton" data-complete-text="finished!" class="btn btn-primary" autocomplete="off">Login</button>');
		htmlStr.push('										<button type="button" id="logoutButton" data-complete-text="finished!" class="btn btn-primary xhui-padding-left-10" autocomplete="off">Logout</button>');
		htmlStr.push('									<div class="xhui-form-mid xhui-input-block xhui-clear xhui-hide">');
		htmlStr.push('										<div class="xhui-tips-container xhui-error" id="dbuserdlg_systemname_tips" ></div>');
		htmlStr.push('									</div>');
		htmlStr.push('								</div>');
		
		
		htmlStr.push(' 							</div>'); 
		htmlStr.push('	  					</div>');
		htmlStr.push('						<div class="xhui-change-item xhui-height-max xhui-hide xhui-align-center xhui-weaken" id="wait-container3-2">');
		htmlStr.push('							<div class="xhui-wait">');
		htmlStr.push('								<i class="xhui-icon xhui-anim xhui-anim-rotate xhui-anim-loop">&#xefa1;</i><span>' + waitTitle + '</span>');
		htmlStr.push('							</div>');
		htmlStr.push('						</div>');
		htmlStr.push('					</div>');
		htmlStr.push('	  			</div>');
		//归档资产分布
		htmlStr.push('	 			<div class="xhui-col-xl-4 xhui-padding-top-5 xhui-padding-left-5 xhui-height-max">');
		htmlStr.push('					<div class="xhui-change-item xhui-align-center xhui-height-max xhui-relative">');
		htmlStr.push('		  				<div class="xhui-layout-row-1 xhui-layout-row-first xhui-padding-top-5 xhui-padding-left-20 xhui-title">');
		htmlStr.push('							<img src="images/safe_zc.png" class="xhui-float-left xhui-padding-right-5" style="padding-top:2px;"/>');
		htmlStr.push('							<label>' + pinTitle + '</label>');
		htmlStr.push('		  				</div>');
		htmlStr.push('		  				<div class="xhui-layout-row-3 xhui-layout-row-last xhui-padding-left-10 xhui-padding-right-10 xhui-top-30" id="container3-3">');
		htmlStr.push('	  						<div class="xhui-col-xl-12 xhui-height-max" id="piechart"></div>');
		htmlStr.push('	  	  				</div>');
		htmlStr.push('						<div class="xhui-change-item xhui-height-max xhui-hide xhui-align-center xhui-weaken" id="wait-container3-3">');
		htmlStr.push('							<div class="xhui-wait">');
		htmlStr.push('								<i class="xhui-icon xhui-anim xhui-anim-rotate xhui-anim-loop">&#xefa1;</i><span>' + waitTitle + '</span>');
		htmlStr.push('							</div>');
		htmlStr.push('						</div>');
		htmlStr.push('					</div>');
		htmlStr.push('	  			</div>');
		htmlStr.push('			</div>');
		htmlStr.push('	</div>');
		htmlStr.push('</div>');
		this.container.innerHTML = htmlStr.join("");
		
		this.barChartDom = this.doc.getElementById("barchart");
		this.pineChartDom = this.doc.getElementById("piechart");
		var accountDom = this.doc.getElementById("account");
		var passwordDom = this.doc.getElementById("password");
		var loginBtn = this.doc.getElementById("loginButton");
		loginBtn.onclick = function(){
			XHUI.post({
	        	action : XHUI.getContextPath() + "dologin",
	        	datas:{
	        		account: accountDom.value,
	        		password: passwordDom.value
	        	},
	        	callback: function(evt){
	        		var data = evt.target.responseText;
	        		if(data == "success"){
	        			self.wnd.location.href= XHUI.getContextPath() + "home";
	        		}else{
	        			alert(data);
	        		}
	        	},
	        	error:function(evt) {
	            	alert("连接服务器异常！");
	            }
	        });
		}
		
		var logoutBtn = this.doc.getElementById("logoutButton");
		logoutBtn.onclick = function(){
			XHUI.post({
	        	action : XHUI.getContextPath() + "/dologout",
	        	datas:{
	        	},
	        	callback: function(evt){
	        		alert("注销完成！");
	        	},
	        	error:function(evt) {
	            	alert("连接服务器异常！");
	            }
	        });
		}
	}
	
	/**
	 * 初始化，饼图
	 */
	LoginFrame.prototype.initPieChart = function() {
		var self = this;
		self.nearPieGraph = echarts.init(self.pineChartDom);
		self.nearPieOption = {
				tooltip : {
					trigger : 'item',
					formatter :"{b} {d}%"
				},
				legend: {
			        x: 'center',
			        y: 'bottom',
			        icon : 'circle',
			        data: ["近线", "离线", "销毁"]
			    },
			     series: [
			        {
			        	type : "pie",
						radius : [ "40%", "60%" ],
						color : [
							'#fc9524',
							'#facf2a',
							'#1eafc5'],
						startAngle : 45,
						label : {
							color : "#000",
							position : "outside",
							formatter : "{b} {d}%"
						},
			          data: null
			        } 
			      ]
		}
		self.nearPieOption.series[0]["data"] = [
			{name: "销毁", value: 6, count: 0},
			{name: "离线", value: 1100, count: 0},
			{name: "近线", value: 7134, count: 0}
		];
		self.nearPieGraph.setOption(self.nearPieOption);
	}
	
	/**
	 * 初始化，条形图
	 */
	LoginFrame.prototype.initBarChart = function() {
		var self = this;
		this.barGraph = echarts.init(self.barChartDom);
		this.barOption = {
				tooltip: {
						trigger: 'axis'
				},
				grid: {
					show:false,
					top:'30',
					bottom:'30',
					right:'60',
					left:'90'
				},
				legend: {
					data: ["记录行数", '归档次数']
				},
				xAxis: [{
						type: 'category',
						data: null,
						axisPointer: {
					                type: 'shadow'
						},
						axisTick: {
							show: true,
							interval: 0
						}
					}],
				//设置两个y轴，左边显示数量，右边显示概率
				yAxis: [{
							type: 'value',
							name: "记录行数",
							show:  true,
							max: 1000,
							interval: 200
						},{
							type: 'value',
							name: "归档次数",
							min: 0,
							max: 100,
							interval: 20
						}],
				series: [{
							name: "记录行数",
							type: 'bar',
							data: null,
							barWidth : '50%',	
							itemStyle: {
								normal: {
									color:"#31B4C9"
						        	}
						    	}					            
					      },{
								name: "归档次数",
					            type: 'line',
					            yAxisIndex: 1,    //这里要设置哪个y轴，默认是最左边的是0，然后1，2顺序来。
					            data: null,
								smooth:true,
								symbol:'none',
					            itemStyle:{
					            	normal:{
					            		color:"#FF8C00"
					           	 	}
					            }
					      }]
					};
		self.barGraph.setOption(self.barOption);
		
		//假数据
		var names = ["资产1", "删除资产01", "testView", "cmw测试"];
		var times = [60, 15, 135, 45];
		var counts = [45, 135, 60, 15];
 		var maxTimes = 135;
		var minTimes = 15;
		var maxCounts = 135;
		var minCounts = 15;
		self.barOption.xAxis[0]["data"] = names;
		self.barOption.series[0]["data"] = counts;
		self.barOption.series[1]["data"] = times;
		self.barOption.yAxis[0]["max"] = maxCounts;
		self.barOption.yAxis[0]["min"] = minCounts;
		self.barOption.yAxis[0]["interval"] = Math.ceil((maxCounts-minCounts)/5);
		self.barOption.yAxis[1]["max"] = maxTimes;
		self.barOption.yAxis[1]["min"] = minTimes;
		self.barOption.yAxis[1]["interval"] = Math.ceil((maxTimes-minTimes)/5);	
		self.barGraph.setOption(self.barOption);
	}
	
	return {
		LoginFrame : LoginFrame
	}
});