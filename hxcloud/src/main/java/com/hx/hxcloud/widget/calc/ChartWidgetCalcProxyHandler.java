package com.hx.hxcloud.widget.calc;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.util.List;

import javax.persistence.EntityManager;

import com.hx.hxcloud.util.SpringContextHolder;
import com.hx.hxcloud.widget.ChartWidget;
import com.hx.hxcloud.widget.LineChartWidegt;

/**
 * 图标组件计算代理类
 * 
 * @author xush
 * @since 2020年4月10日
 */

public class ChartWidgetCalcProxyHandler implements InvocationHandler {

	private Object object;

	private EntityManager entityManager;

	public ChartWidgetCalcProxyHandler(Object object) {
		this.object = object;
		this.entityManager = SpringContextHolder.getBean(EntityManager.class);
	}

	@Override
	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
		if (method.getName().equals("doCalc") && object instanceof ChartWidget) {
			ChartWidget widget = (ChartWidget) object;
			//处理条形图的计算
			if (widget instanceof LineChartWidegt) {
				String sql = ((LineChartWidegt) widget).prexAisx();
				@SuppressWarnings("unchecked")
				List<String> result = entityManager.createNativeQuery(sql).getResultList();
				((LineChartWidegt) widget).afterxAisx(result);
			}
			String sql = widget.preCalc();
			@SuppressWarnings("unchecked")
			List<Object[]> result = entityManager.createNativeQuery(sql).getResultList();
			widget.afterCalc(result);
		}
		Object result = method.invoke(object, args);
		return result;
	}

}
