define(
		[ "third/echarts.min", "main/chartwidget/linechartwidget" ],
		function(echarts, linchart) {
			"use strict"
			var LineChartWidget = linchart.LineChartWidget;
			/**
			 * 登录页面 1.登录和登出 2.伪装页面
			 */
			function CoronaVirus(options) {
				this.wnd = options.wnd || window;
				this.doc = this.wnd.document;
				this.container = options.container;
				this.initPage(); // 初始化界面
			}

			/**
			 * 销毁方法
			 */
			CoronaVirus.prototype.dispose = function() {
				this.wnd = null;
				this.doc = null;
				this.container = null;
				this.pineChartDom = null;
				this.barChartDom = null;
			}

			/**
			 * 初始化界面
			 */
			CoronaVirus.prototype.initPage = function() {
				this.initUI(); // 初始化界面 框架
				this.initBarChart(); // 初始化条形图
				this.initPieChart(); // 初始化饼图
			}

			/**
			 * 定义界面结构
			 */
			CoronaVirus.prototype.initUI = function() {
				var self = this;
				var htmlStr = [];
				var sizesTitle = "数据量";
				var countsTitle = "记录行数";
				var nearLineResTitle = "近线归档资产";
				var offLineResTitle = "离线归档资产";
				var desResTitle = "销毁资产";
				var pinTitle = "归档资产分布";
				var waitTitle = "正在加载...";

				htmlStr.push('<div class="xhui-height-max xhui-change-bg">');
				htmlStr
						.push('	<div class="xhui-layout-container" id="mainpage">');
				// 第一行
				htmlStr
						.push('			<div class="xhui-row " style="height:25%;" id="line1">');
				htmlStr
						.push('				<div class="xhui-change-item xhui-align-center xhui-height-max xhui-relative">');
				htmlStr
						.push('		  			<div class="xhui-layout-row-1 xhui-layout-row-first xhui-padding-left-5 xhui-padding-right-10 " id="dataSetTimeTab">');
				htmlStr.push('	  	  			</div>');
				htmlStr
						.push('		  			<div class="xhui-layout-row-3 xhui-layout-row-last xhui-padding-top-5 xhui-padding-left-10 xhui-padding-right-10 xhui-top-30 " id="container1">');
				// 近线归档资产
				htmlStr
						.push('	  					<div class="xhui-col-xl-4 xhui-height-max xhui-padding-top-5 " id="line1">');
				htmlStr
						.push('							<div class="xhui-change-item xhui-align-center xhui-height-max xhui-relative" style="border-radius:0px;border-right:1px solid #f0f0f0;">');
				htmlStr
						.push('								<div class="xhui-layout-row-1 xhui-layout-row-first xhui-padding-top-5 xhui-padding-left-25 xhui-title">');
				htmlStr
						.push('									<img src="images/safe_jx.png" class=" xhui-float-left xhui-padding-right-5"/>');
				htmlStr.push('									<label >' + nearLineResTitle
						+ '</label>');
				htmlStr.push('								</div>');
				htmlStr
						.push('								<div class="xhui-layout-row-3 xhui-layout-row-last xhui-row xhui-padding-bottom-10 xhui-top-30" id="container1-1">');
				htmlStr
						.push('									<div class="xhui-col-xl-6 xhui-height-max xhui-align-center" style="border-right:1px solid #f0f0f0;">');
				htmlStr.push('										<div class="lc-align-center ">');
				htmlStr
						.push('											<div class="xhui-blue-num-text" id="near-size">30 B</div>');
				htmlStr.push('											<label>' + sizesTitle + '</label>');
				htmlStr.push('										</div>');
				htmlStr.push('									</div>');
				htmlStr
						.push('									<div class="xhui-col-xl-6 xhui-height-max xhui-align-center ">');
				htmlStr.push('										<div class="lc-align-center ">');
				htmlStr
						.push('											<div class="xhui-blue-num-text" id="near-count">24 行</div>');
				htmlStr.push('											<label>' + countsTitle + '</label>');
				htmlStr.push('										</div>');
				htmlStr.push('									</div>');
				htmlStr.push('								</div>');
				htmlStr
						.push('								<div class="xhui-change-item xhui-height-max xhui-hide xhui-align-center xhui-weaken" id="wait-container1-1">');
				htmlStr.push('									<div class="xhui-wait">');
				htmlStr
						.push('										<i class="xhui-icon xhui-anim xhui-anim-rotate xhui-anim-loop">&#xefa1;</i><span>'
								+ waitTitle + '</span>');
				htmlStr.push('									</div>');
				htmlStr.push('								</div>');
				htmlStr.push('							</div>');
				htmlStr.push('	  					</div>');
				// 离线归档资产
				htmlStr
						.push('	  					<div class="xhui-col-xl-4 xhui-height-max xhui-padding-top-5">');
				htmlStr
						.push('							<div class="xhui-change-item xhui-align-center xhui-height-max xhui-relative" style="border-radius:0px;border-right:1px solid #f0f0f0;">');
				htmlStr
						.push('								<div class="xhui-layout-row-1 xhui-layout-row-first xhui-padding-top-5 xhui-padding-left-25 xhui-title">');
				htmlStr
						.push('									<img src="images/safe_lx.png" class=" xhui-float-left xhui-padding-right-5"/>');
				htmlStr.push('									<label>' + offLineResTitle + '</label>');
				htmlStr.push('								</div>');
				htmlStr
						.push('								<div class="xhui-layout-row-3 xhui-layout-row-last xhui-row xhui-padding-bottom-10 xhui-top-30" id="container1-2">');
				htmlStr
						.push('									<div class="xhui-col-xl-6 xhui-height-max xhui-align-center" style="border-right:1px solid #f0f0f0;">');
				htmlStr.push('										<div class="lc-align-center ">');
				htmlStr
						.push('											<div class="xhui-blue-num-text" id="off-size">342 B</div>');
				htmlStr.push('											<label>' + sizesTitle + '</label>');
				htmlStr.push('										</div>');
				htmlStr.push('									</div>');
				htmlStr
						.push('									<div class="xhui-col-xl-6 xhui-height-max xhui-align-center ">');
				htmlStr.push('										<div class="lc-align-center ">');
				htmlStr
						.push('											<div class="xhui-blue-num-text" id="off-count">56 行</div>');
				htmlStr.push('											<label>' + countsTitle + '</label>');
				htmlStr.push('										</div>');
				htmlStr.push('									</div>');
				htmlStr.push('								</div>');
				htmlStr
						.push('								<div class="xhui-change-item xhui-height-max xhui-hide xhui-align-center xhui-weaken" id="wait-container1-2">');
				htmlStr.push('									<div class="xhui-wait">');
				htmlStr
						.push('										<i class="xhui-icon xhui-anim xhui-anim-rotate xhui-anim-loop">&#xefa1;</i><span>'
								+ waitTitle + '</span>');
				htmlStr.push('									</div>');
				htmlStr.push('								</div>');
				htmlStr.push('							</div>');
				htmlStr.push('	  					</div>');
				// 销毁资产
				htmlStr
						.push('	  					<div class="xhui-col-xl-4 xhui-height-max xhui-padding-top-5">');
				htmlStr
						.push('							<div class="xhui-change-item xhui-align-center xhui-height-max xhui-relative">');
				htmlStr
						.push('								<div class="xhui-layout-row-1 xhui-layout-row-first xhui-padding-top-5 xhui-padding-left-25 xhui-title">');
				htmlStr
						.push('									<img src="images/safe_xh.png" class=" xhui-float-left xhui-padding-right-5"/>');
				htmlStr.push('									<label>' + desResTitle + '</label>');
				htmlStr.push('								</div>');
				htmlStr
						.push('								<div class="xhui-layout-row-3 xhui-layout-row-last xhui-row xhui-padding-bottom-10 xhui-top-30" id="container1-3">');
				htmlStr
						.push('									<div class="xhui-col-xl-6 xhui-height-max xhui-align-center" style="border-right:1px solid #f0f0f0;">');
				htmlStr.push('										<div class="lc-align-center ">');
				htmlStr
						.push('											<div class="xhui-blue-num-text" id="destory-size">6.82 KB</div>');
				htmlStr.push('											<label>' + sizesTitle + '</label>');
				htmlStr.push('										</div>');
				htmlStr.push('									</div>');
				htmlStr
						.push('									<div class="xhui-col-xl-6 xhui-height-max xhui-align-center ">');
				htmlStr.push('										<div class="lc-align-center ">');
				htmlStr
						.push('											<div class="xhui-blue-num-text" id="destory-count">154 行</div>');
				htmlStr.push('											<label>' + countsTitle + '</label>');
				htmlStr.push('										</div>');
				htmlStr.push('									</div>');
				htmlStr.push('								</div>');
				htmlStr
						.push('								<div class="xhui-change-item xhui-height-max xhui-hide xhui-align-center xhui-weaken" id="wait-container1-3">');
				htmlStr.push('									<div class="xhui-wait">');
				htmlStr
						.push('										<i class="xhui-icon xhui-anim xhui-anim-rotate xhui-anim-loop">&#xefa1;</i><span>'
								+ waitTitle + '</span>');
				htmlStr.push('									</div>');
				htmlStr.push('								</div>');
				htmlStr.push('							</div>');
				htmlStr.push('	  					</div>');
				htmlStr.push('	  	  			</div>');
				htmlStr
						.push('					<div class="xhui-change-item xhui-height-max xhui-hide xhui-align-center xhui-weaken" id="wait-container1">');
				htmlStr.push('						<div class="xhui-wait">');
				htmlStr
						.push('							<i class="xhui-icon xhui-anim xhui-anim-rotate xhui-anim-loop">&#xefa1;</i><span>'
								+ waitTitle + '</span>');
				htmlStr.push('						</div>');
				htmlStr.push('					</div>');
				htmlStr.push('				</div>');
				htmlStr.push('		</div>');
				// 第二行
				htmlStr
						.push('			<div class="xhui-row " style="height:80%" id="line2">');
				htmlStr
						.push('	  			<div class="xhui-col-xl-12 xhui-padding-top-5 xhui-height-max" id="lin2-1"> ');

				htmlStr.push('	  			</div>');
				htmlStr.push('			</div>');
				// 第三行
				htmlStr
						.push('			<div class="xhui-row " style="height:35%" id="line3">');
				// 近、离线归档
				htmlStr
						.push('	  			<div class="xhui-col-xl-4 xhui-padding-top-5 xhui-padding-right-5 xhui-height-max">');
				htmlStr
						.push('					<div class="xhui-change-item xhui-align-center xhui-height-max xhui-relative">');
				htmlStr
						.push('		  				<div class="xhui-layout-row-1 xhui-layout-row-first xhui-padding-left-5 xhui-padding-right-10 " id="lineAreaArchiveTab">');
				htmlStr.push('	  	  				</div>');
				htmlStr
						.push('		  				<div class="xhui-layout-row-3 xhui-layout-row-last xhui-padding-left-10 xhui-padding-right-10 xhui-top-30" id="container3-1">');
				htmlStr
						.push('	  						<div class="xhui-height-max xhui-padding-top-15 " id="treeview"></div>');
				htmlStr.push('	  	  				</div>');
				htmlStr
						.push('						<div class="xhui-change-item xhui-height-max xhui-hide xhui-align-center xhui-weaken" id="wait-container3-1">');
				htmlStr.push('							<div class="xhui-wait">');
				htmlStr
						.push('								<i class="xhui-icon xhui-anim xhui-anim-rotate xhui-anim-loop">&#xefa1;</i><span>'
								+ waitTitle + '</span>');
				htmlStr.push('							</div>');
				htmlStr.push('						</div>');
				htmlStr.push('					</div>');
				htmlStr.push('	  			</div>');
				// 近线归档和销毁Top5
				htmlStr
						.push('	 			<div class="xhui-col-xl-4 xhui-padding-top-5 xhui-padding-left-5 xhui-height-max">');
				htmlStr
						.push('					<div class="xhui-change-item xhui-align-center xhui-height-max xhui-relative">');
				htmlStr
						.push('		  				<div class="xhui-layout-row-1 xhui-layout-row-first xhui-padding-left-5 xhui-padding-right-10 " id="top5Tab">');
				htmlStr.push('	  	  				</div>');
				htmlStr
						.push('		  				<div class="xhui-layout-row-3 xhui-layout-row-last xhui-padding-left-10 xhui-padding-right-10 xhui-top-30" id="container3-2">');
				htmlStr
						.push('	  						<div class="xhui-height-max xhui-padding-top-15" id="toplist">');

				htmlStr.push('								<div class="xhui-form-item">');
				// htmlStr.push(' <label class="xhui-form-label
				// xhui-form-required">账号：</label>');
				htmlStr
						.push('									<div class="xhui-input-block"><input type="text" class="xhui-form" value="" id="account"></div>');
				htmlStr
						.push('									<div class="xhui-form-mid xhui-input-block xhui-clear xhui-hide">');
				htmlStr
						.push('										<div class="xhui-tips-container xhui-error" id="dbuserdlg_systemname_tips" ></div>');
				htmlStr.push('									</div>');
				htmlStr.push('								</div>');
				htmlStr.push('								<div class="xhui-form-item">');
				// htmlStr.push(' <label class="xhui-form-label
				// xhui-form-required">密码：</label>');
				htmlStr
						.push('									<div class="xhui-input-block"><input type="password" class="xhui-form" value="" id="password"></div>');
				htmlStr
						.push('									<div class="xhui-form-mid xhui-input-block xhui-clear xhui-hide">');
				htmlStr
						.push('										<div class="xhui-tips-container xhui-error" id="dbuserdlg_systemname_tips" ></div>');
				htmlStr.push('									</div>');
				htmlStr.push('								</div>');
				htmlStr.push('								<div class="xhui-form-item">');
				htmlStr
						.push('										<button type="button" id="loginButton" data-complete-text="finished!" class="btn btn-primary" autocomplete="off">Login</button>');
				htmlStr
						.push('										<button type="button" id="logoutButton" data-complete-text="finished!" class="btn btn-primary xhui-padding-left-10" autocomplete="off">Logout</button>');
				htmlStr
						.push('									<div class="xhui-form-mid xhui-input-block xhui-clear xhui-hide">');
				htmlStr
						.push('										<div class="xhui-tips-container xhui-error" id="dbuserdlg_systemname_tips" ></div>');
				htmlStr.push('									</div>');
				htmlStr.push('								</div>');

				htmlStr.push(' 							</div>');
				htmlStr.push('	  					</div>');
				htmlStr
						.push('						<div class="xhui-change-item xhui-height-max xhui-hide xhui-align-center xhui-weaken" id="wait-container3-2">');
				htmlStr.push('							<div class="xhui-wait">');
				htmlStr
						.push('								<i class="xhui-icon xhui-anim xhui-anim-rotate xhui-anim-loop">&#xefa1;</i><span>'
								+ waitTitle + '</span>');
				htmlStr.push('							</div>');
				htmlStr.push('						</div>');
				htmlStr.push('					</div>');
				htmlStr.push('	  			</div>');
				// 归档资产分布
				htmlStr
						.push('	 			<div class="xhui-col-xl-4 xhui-padding-top-5 xhui-padding-left-5 xhui-height-max">');
				htmlStr
						.push('					<div class="xhui-change-item xhui-align-center xhui-height-max xhui-relative">');
				htmlStr
						.push('		  				<div class="xhui-layout-row-1 xhui-layout-row-first xhui-padding-top-5 xhui-padding-left-20 xhui-title">');
				htmlStr
						.push('							<img src="images/safe_zc.png" class="xhui-float-left xhui-padding-right-5" style="padding-top:2px;"/>');
				htmlStr.push('							<label>' + pinTitle + '</label>');
				htmlStr.push('		  				</div>');
				htmlStr
						.push('		  				<div class="xhui-layout-row-3 xhui-layout-row-last xhui-padding-left-10 xhui-padding-right-10 xhui-top-30" id="container3-3">');
				htmlStr
						.push('	  						<div class="xhui-col-xl-12 xhui-height-max" id="piechart"></div>');
				htmlStr.push('	  	  				</div>');
				htmlStr
						.push('						<div class="xhui-change-item xhui-height-max xhui-hide xhui-align-center xhui-weaken" id="wait-container3-3">');
				htmlStr.push('							<div class="xhui-wait">');
				htmlStr
						.push('								<i class="xhui-icon xhui-anim xhui-anim-rotate xhui-anim-loop">&#xefa1;</i><span>'
								+ waitTitle + '</span>');
				htmlStr.push('							</div>');
				htmlStr.push('						</div>');
				htmlStr.push('					</div>');
				htmlStr.push('	  			</div>');
				htmlStr.push('			</div>');
				htmlStr.push('	</div>');
				htmlStr.push('</div>');
				this.container.innerHTML = htmlStr.join("");

				this.foreignTrendGraphDom = this.doc
						.getElementById("lin2-1");
				this.pineChartDom = this.doc.getElementById("piechart");
				var accountDom = this.doc.getElementById("account");
				var passwordDom = this.doc.getElementById("password");
				var loginBtn = this.doc.getElementById("loginButton");
				loginBtn.onclick = function() {
					XHUI.post({
						action : XHUI.getContextPath() + "dologin",
						datas : {
							account : accountDom.value,
							password : passwordDom.value
						},
						callback : function(evt) {
							var data = evt.target.responseText;
							if (data == "success") {
								self.wnd.location.href = XHUI.getContextPath()
										+ "home";
							} else {
								alert(data);
							}
						},
						error : function(evt) {
							alert("连接服务器异常！");
						}
					});
				}

				var logoutBtn = this.doc.getElementById("logoutButton");
				logoutBtn.onclick = function() {
					XHUI.post({
						action : XHUI.getContextPath() + "/dologout",
						datas : {},
						callback : function(evt) {
							alert("注销完成！");
						},
						error : function(evt) {
							alert("连接服务器异常！");
						}
					});
				}
			}

			/**
			 * 初始化，饼图
			 */
			CoronaVirus.prototype.initPieChart = function() {
				var self = this;
				self.nearPieGraph = echarts.init(self.pineChartDom);
				self.nearPieOption = {
					tooltip : {
						trigger : 'item',
						formatter : "{b} {d}%"
					},
					legend : {
						x : 'center',
						y : 'bottom',
						icon : 'circle',
						data : [ "近线", "离线", "销毁" ]
					},
					series : [ {
						type : "pie",
						radius : [ "40%", "60%" ],
						color : [ '#fc9524', '#facf2a', '#1eafc5' ],
						startAngle : 45,
						label : {
							color : "#000",
							position : "outside",
							formatter : "{b} {d}%"
						},
						data : null
					} ]
				}
				self.nearPieOption.series[0]["data"] = [ {
					name : "销毁",
					value : 6,
					count : 0
				}, {
					name : "离线",
					value : 1100,
					count : 0
				}, {
					name : "近线",
					value : 7134,
					count : 0
				} ];
				self.nearPieGraph.setOption(self.nearPieOption);
			}

			/**
			 * 初始化，条形图
			 */
			CoronaVirus.prototype.initBarChart = function() {
				var self = this;
				this.foreignTrendGraph = new LineChartWidget({
					container : self.foreignTrendGraphDom
				})
				$(function() {
					$('#treeview').jstree({
						"core" : {
							"data" : [ {
								"id" : "0",
								"parent" : "#",
								"state" : {
									"disabled" : false,
									"opened" : true,
									"selected" : false
								},
								"text" : "夏宇信息"
							}, {
								"id" : "69",
								"parent" : "0",
								"text" : "工程"
							}, {
								"id" : "5",
								"parent" : "0",
								"text" : "行政"
							}, {
								"id" : "71",
								"parent" : "0",
								"text" : "迷"
							}, {
								"id" : "1",
								"parent" : "0",
								"text" : "技术"
							} ],
							"themes" : {
								"variant" : "large",// 加大
								"ellipsis" : true
							// 文字多时省略
							},
							"check_callback" : true
						},
						"plugins" : [ "wholerow", "themes" ]
					}).on('select_node.jstree', function(event, data) {
						console.log(data.node);
					}).on('changed.jstree', function(event, data) {
						console.log("-----------changed.jstree");
						console.log("action:" + data.action);
						console.log(data.node);
					});

				});

			}

			/**
			 * 初始化，条形图
			 */
			CoronaVirus.prototype.refreshForeignTrendDatas = function(country) {
				var self = this;
				XHUI.post({
					action : XHUI.getContextPath()
							+ "coronavirus/listForeignTrendDatas",
					datas : {
						country : country
					},
					callback : function(evt) {
						var result = JSON.parse(evt.target.responseText);
						self.foreignTrendOption.xAxis.data = result.day;
						self.foreignTrendOption.series[0].data = result.cnt;
						self.foreignTrendGraph.setOption(self.foreignTrendOption);
					}
				});
			}

			return {
				CoronaVirus : CoronaVirus
			}
		});