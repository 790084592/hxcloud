define(
		[ "third/echarts.min" ],
		function(echarts) {
			"use strict"

			/**
			 * 条形图组件
			 * 
			 */
			function LineChartWidget(options) {
				this.wnd = options.wnd || window;
				this.doc = this.wnd.document;
				this.tag = "LineChartWidget"; // 标签名称
				this.id = options.id || XHUI.getRandomTagId(this.tag);
				this.chartDom = null;
				this.chart = null;
				this.chartOption = options.chartOption || null;
				this.container = options.container;
				// x轴信息
				this.xCoordinate = options.xCoordinate || {};
				// y轴信息
				this.yCoordinate = options.yCoordinate || {};
				this.tableInfo = options.tableInfo || [];
				this.initPage(); // 初始化界面
			}

			/**
			 * 销毁方法
			 */
			LineChartWidget.prototype.dispose = function() {
				this.wnd = null;
				this.doc = null;
				this.tag = null;
				this.id = null;
				this.container = null;
				this.chartDom = null;
				this.chart = null;
				this.chartOption = null;
				this.xCoordinate = null;
				this.yCoordinate = null;
				this.tableInfo = null;
			}

			/**
			 * 初始化界面
			 */
			LineChartWidget.prototype.initPage = function() {
				this.initUI(); // 初始化界面 框架
				this.initLineChart(); // 初始化条形图
				this.refreshChartDatas(this.toJSON());
			}

			/**
			 * 定义界面结构
			 */
			LineChartWidget.prototype.initUI = function() {
				var htmlStr = [];
				htmlStr
						.push('<div class="xhui-change-item xhui-align-center xhui-height-max xhui-relative" id='
								+ this.id + '>');
				htmlStr
						.push('		<div class="xhui-layout-row-1 xhui-layout-row-first xhui-padding-left-5 xhui-padding-right-10 " id="barChartTab">');
				htmlStr.push('		</div>');
				htmlStr
						.push('		<div class="xhui-layout-row-3 xhui-layout-row-last xhui-padding-top-15 xhui-padding-left-10 xhui-padding-right-10 xhui-top-30" id="container2"> ');
				htmlStr.push('			<div class="xhui-height-max" id=' + this.id
						+ "dom" + '></div>');
				htmlStr.push('	  	</div>');
				htmlStr
						.push('		<div class="xhui-change-item xhui-height-max xhui-hide xhui-align-center xhui-weaken" id="wait-container2">');
				htmlStr.push('			<div class="xhui-wait">');
				htmlStr
						.push('				<i class="xhui-icon xhui-anim xhui-anim-rotate xhui-anim-loop">&#xefa1;</i>');
				htmlStr.push('				<span>' + "正在加载..." + '</span>');
				htmlStr.push('			</div>');
				htmlStr.push('		</div>');
				htmlStr.push('</div>');
				this.container.innerHTML = htmlStr.join("");
				this.chartDom = this.doc.getElementById(this.id + "dom");
			}

			/**
			 * 初始化，条形图
			 */
			LineChartWidget.prototype.initLineChart = function() {
				var self = this;
				this.chart = echarts.init(self.chartDom);
				this.chartOption = this.chartOption
						|| {
							tooltip : {
								trigger : 'axis',
								formatter(params) {
								    console.log(params);// 打印相关数据
								    params.sort(function(a,b){
								    	return b.value - a.value;
								    });
 								    var htmlStr = params[0].axisValue;
								    for(var i = 0; i < params.length; i++){
								    	htmlStr += "<br>" + params[i].seriesName + ":" + params[i].marker +  params[i].value;
								    }
								    return htmlStr;
								}
							},
							dataZoom : [ {
								startValue : '20200401'
							}, {
								type : 'inside'
							} ],
							grid : {
								show : false,
								top : '30',
								bottom : '60',
								right : '60',
								left : '90'
							},
							legend : {
								data : [ 'category', 'value' ]
							},
							xAxis : {
								type : 'category',
								data : [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri',
										'Sat', 'Sun' ]
							},
							yAxis : {
								type : 'value'
							},
							series : [ {
								data : [ 820, 932, 901, 934, 1290, 1330, 1320 ],
								type : 'line'
							} ]
						};
				this.chart.setOption(this.chartOption);
			}

			/**
			 * 初始化，条形图
			 */
			LineChartWidget.prototype.refreshChartDatas = function() {
				var self = this;
				XHUI.post({
					action : XHUI.getContextPath() + "linechart/calc",
					async : true,
					datas : {
						content : JSON.stringify(self.toJSON())
					},
					callback : function(evt) {
						self.chartOption = JSON.parse(evt.target.responseText);
						self.chart.setOption(self.chartOption);
					}
				});
			}

			/**
			 * 初始化，条形图
			 */
			LineChartWidget.prototype.toJSON = function() {
				var content = {};
				content.id = this.id;
				content.tag = this.tag;
				content.chartOption = this.chartOption;
				content.xCoordinate = this.xCoordinate;
				content.yCoordinate = this.yCoordinate;
				content.tableInfo = this.tableInfo;
				return content;
			}

			return {
				LineChartWidget : LineChartWidget
			}
		});