package com.hx.hxcloud.configurer;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.hx.hxcloud.configurer.filterimpl.LoginFilterImpl;

/**
 * 注册url拦截器
 * @author xush
 * @since 2019年12月6日
 */
@Configuration
public class LoginFilterConfigurer {
	
	@Value("${server.servlet.context-Path:#{''}}")
	private String contextPath;

	@Bean
	public FilterRegistrationBean<LoginFilterImpl> adFilterLoginRegistration() {
		FilterRegistrationBean<LoginFilterImpl> registration = new FilterRegistrationBean<LoginFilterImpl>();
		LoginFilterImpl loginFilter = new LoginFilterImpl();
		registration.setOrder(4); //拦截器的优先级，越小优先级越高
		registration.setFilter(loginFilter);
		registration.addUrlPatterns("/*");
		HashMap<String, String> initParameters = new HashMap<String, String>();
		initParameters.put("excludedUris", "/error,/css/**,/third/**,/webjars/**,/util/**,/images/**,/main/**,/login,/dologin");
		initParameters.put("contextPath", contextPath);
		registration.setInitParameters(initParameters);
		registration.setName("loginFilter");
		return registration;
	}

}
