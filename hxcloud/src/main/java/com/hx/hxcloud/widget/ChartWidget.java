package com.hx.hxcloud.widget;

import java.util.List;

import com.hx.hxcloud.widget.calc.WidgetCalc;

import cn.hutool.json.JSONObject;

/**
 * 图像组件的基类
 * 
 * @author xush
 * @since 2020年4月10日
 */
public class ChartWidget implements WidgetCalc{
	public static final String TAG = "ChartWidget";

	private String id;

	public ChartWidget(JSONObject content) {
		this.id = content.getStr("id");
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	@Override
	public String preCalc() {
		return null;
	}

	@Override
	public void afterCalc(List<Object[]> result) {
		
	}

	@Override
	public void doCalc() {
	}
}
