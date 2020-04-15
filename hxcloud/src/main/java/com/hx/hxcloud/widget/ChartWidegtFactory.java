package com.hx.hxcloud.widget;

import cn.hutool.json.JSONObject;

/**
 * 图表组件工厂方法类
 * 
 * @author xush
 * @since 2020年4月10日
 */
public class ChartWidegtFactory {

	public static ChartWidget getInstance(String tag, JSONObject content) {
		ChartWidget chart = null;
		switch (tag) {
		case LineChartWidegt.TAG:
			chart = new LineChartWidegt(content);
			break;
		}
		return chart;
	}

}
