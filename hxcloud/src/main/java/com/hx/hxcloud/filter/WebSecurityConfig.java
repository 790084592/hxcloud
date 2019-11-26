package com.hx.hxcloud.filter;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * 登录检查拦截
 * 
 * @author xush
 * @since 2019年9月12日
 */
@Configuration
public class WebSecurityConfig implements WebMvcConfigurer {

	public static final String SESSION_KEY = "account";

	@Bean
	public SecurityInterceptor getSecurityInterceptor() {
		return new SecurityInterceptor();
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		InterceptorRegistration addInterceptor = registry.addInterceptor(getSecurityInterceptor());
		// 排除配置
		addInterceptor.excludePathPatterns("/error");
		addInterceptor.excludePathPatterns("/css/**");
		addInterceptor.excludePathPatterns("/third/**");
		addInterceptor.excludePathPatterns("/webjars/**");
		addInterceptor.excludePathPatterns("/util/**");
		addInterceptor.excludePathPatterns("/images/**");
		addInterceptor.excludePathPatterns("/main/**");
		addInterceptor.excludePathPatterns("/login/**");
		addInterceptor.excludePathPatterns("/dologin/**");
		// 拦截配置
		addInterceptor.addPathPatterns("/**/**");
	}

	private class SecurityInterceptor extends HandlerInterceptorAdapter {
		@Override
		public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
				throws IOException {
			HttpSession session = request.getSession();
			// 判断是否已有该用户登录的session
			if (session.getAttribute(SESSION_KEY) != null) {
				return true;
			}
			// 跳转到登录页
			String url = "/login";
			response.sendRedirect(url);
			return false;
		}
	}
}
