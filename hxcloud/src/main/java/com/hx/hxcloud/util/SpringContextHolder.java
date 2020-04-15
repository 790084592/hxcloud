package com.hx.hxcloud.util;

import java.util.Map;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * spring上下文根
 * 
 * @author xush
 * @since 2020年4月11日
 */
@Component
public class SpringContextHolder implements ApplicationContextAware {
	private static ApplicationContext applicationContext = null;

	/**
	 * 获取applicationContext
	 *
	 * @return
	 */
	public static ApplicationContext getApplicationContext() {
		return applicationContext;
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		if (SpringContextHolder.applicationContext == null) {
			SpringContextHolder.applicationContext = applicationContext;
		}
	}

	/**
	 * 通过name获取 Bean.
	 */
	public static Object getBean(String name) {
		return getApplicationContext().getBean(name);
	}

	/**
	 * 通过class获取Bean.
	 *
	 * @param clazz
	 * @param <T>
	 * @return
	 */
	public static <T> T getBean(Class<T> clazz) {
		return getApplicationContext().getBean(clazz);
	}

	/**
	 * 通过name,以及Clazz返回指定的Bean
	 *
	 * @param name
	 * @param clazz
	 * @param <T>
	 * @return
	 */
	public static <T> T getBean(String name, Class<T> clazz) {
		return getApplicationContext().getBean(name, clazz);
	}

	/**
	 * 获取指定类型的所有bean实例
	 *
	 * @param clazz
	 * @param <T>
	 * @return
	 */
	public static <T> Map<String, T> getBeansOfType(Class<T> clazz) {
		Map<String, T> instances = getApplicationContext().getBeansOfType(clazz);
		return instances;
	}
}