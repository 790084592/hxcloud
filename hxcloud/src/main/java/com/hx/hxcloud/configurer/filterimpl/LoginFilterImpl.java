package com.hx.hxcloud.configurer.filterimpl;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginFilterImpl implements Filter {

	public static final String SESSION_KEY = "account";

	private String[] excludedUris;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		excludedUris = filterConfig.getInitParameter("excludedUris").split(",");
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		String url = httpRequest.getServletPath();
		if (isExcludedUri(url)) {
			chain.doFilter(request, response);
			return;
		} else {
			HttpSession session = httpRequest.getSession();
			// 判断是否已有该用户登录的session
			if (session.getAttribute(SESSION_KEY) != null) {
				chain.doFilter(request, response);
				return;
			}
			// 跳转到登录页
			httpResponse.sendRedirect("/login");
		}
	}

	@Override
	public void destroy() {

	}

	private boolean isExcludedUri(String uri) {
		if (excludedUris == null || excludedUris.length <= 0) {
			return false;
		}
		for (String ex : excludedUris) {
			uri = uri.trim().toLowerCase();
			ex = ex.trim().toLowerCase();
			String exx = ex;
			if (ex.endsWith("/**")) { // "/**"指其所有子目录和文件
				exx = ex.substring(0, ex.length()-3);
			}else if (ex.contentEquals("/*")){ // "/*"指其下一级目录和文件
				exx = ex.substring(0, ex.length()-2);
				if(uri.indexOf(exx) == 0) {
					return true;
				}
			}
			
		}
		return false;
	}

}
