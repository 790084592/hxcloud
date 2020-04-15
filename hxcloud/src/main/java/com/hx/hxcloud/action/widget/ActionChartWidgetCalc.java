package com.hx.hxcloud.action.widget;

import java.lang.reflect.Proxy;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hx.hxcloud.widget.LineChartWidegt;
import com.hx.hxcloud.widget.calc.ChartWidgetCalcProxyHandler;
import com.hx.hxcloud.widget.calc.WidgetCalc;

import cn.hutool.json.JSONObject;

/**
 * 新冠肺炎数据页面
 * 
 * @author xush
 * @since 2020年4月6日
 */
@Controller
public class ActionChartWidgetCalc {

	/**
	 * 计算线状图
	 * 
	 * @param req
	 * @return 返回chartOption
	 */
	@RequestMapping("/linechart/calc")
	@ResponseBody
	public JSONObject calc(HttpServletRequest req) {
		String str = req.getParameter("content");
		JSONObject content = new JSONObject(str);
		LineChartWidegt widget = new LineChartWidegt(content);
		WidgetCalc proxyBuyHouse = (WidgetCalc) Proxy.newProxyInstance(WidgetCalc.class.getClassLoader(),
				new Class[] { WidgetCalc.class }, new ChartWidgetCalcProxyHandler(widget));
		proxyBuyHouse.doCalc();
		return widget.getChartOption();
	}
}
