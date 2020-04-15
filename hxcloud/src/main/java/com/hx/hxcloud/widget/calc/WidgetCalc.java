package com.hx.hxcloud.widget.calc;

import java.util.List;

public interface WidgetCalc {
	/**
	 * 计算预处理
	 * 
	 * @return 计算sql
	 */
	String preCalc();

	/**
	 * 进行计算
	 */
	void doCalc();

	/**
	 * 计算完的处理
	 */
	void afterCalc(List<Object[]> result);

}
