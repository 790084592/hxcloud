package com.hx.hxcloud.configurer;

import java.util.HashMap;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.hx.hxcloud.configurer.filterimpl.LoginFilterImpl;

@Configuration
public class LoginFilterConfigurer {

	@Bean
	public FilterRegistrationBean<LoginFilterImpl> adFilterLoginRegistration() {
		FilterRegistrationBean<LoginFilterImpl> registration = new FilterRegistrationBean<LoginFilterImpl>();
		LoginFilterImpl loginFilter = new LoginFilterImpl();
		registration.setOrder(4);
		registration.setFilter(loginFilter);
		registration.addUrlPatterns("/*");
		HashMap<String, String> initParameters = new HashMap<String, String>();
		initParameters.put("excludedUris", "/error,/css,/third,/webjars,/util,/images,/main,/login,/dologin");
		registration.setInitParameters(initParameters);
		registration.setName("loginFilter");
		return registration;
	}

}