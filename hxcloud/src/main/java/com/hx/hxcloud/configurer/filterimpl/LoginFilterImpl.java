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

/**
 * 拦截器具体实现类
 * 1.初始化拦截器，获取上下文根
 * 2.拦截未登录，且需要登录的请求
 * 3.过滤无需登录的请求，如静态资源等
 * @author xush
 * @since 2019年12月6日
 */
public class LoginFilterImpl implements Filter {

	public static final String SESSION_KEY = "account"; //登录名

	private String[] excludedUris; //无需登录的请求

	private String contextPath;  //上下文根

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		excludedUris = filterConfig.getInitParameter("excludedUris").split(",");
		contextPath = filterConfig.getInitParameter("contextPath") + "/";		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		request.setAttribute("contextPath", contextPath);
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
			httpResponse.sendRedirect(contextPath + "login");
		}
	}

	@Override
	public void destroy() {

	}

	/**
	 * 
	 * @param uri
	 * @return
	 */
	private boolean isExcludedUri(String uri) {
		if (excludedUris == null || excludedUris.length <= 0) {
			return false;
		}
		for (String ex : excludedUris) {
			uri = uri.trim().toLowerCase();
			ex = ex.trim().toLowerCase();
			String exx;
			if (ex.startsWith("/**")) { // 类似 /**/login的请求
				exx = ex.substring(3, ex.length() - 1);
				if (uri.endsWith(exx)) {
					return true;
				}
			} else if (ex.endsWith("/**")) { // 类似 /login/**的请求
				exx = ex.substring(0, ex.length() - 3);
				if (uri.equals(exx) || uri.startsWith(exx + "/")) {
					return true;
				}
			} else if (ex.startsWith("/*")) {// 类似 /*/login的请求
				exx = ex.substring(2, ex.length() - 1);
				if (uri.equals(exx)
						|| (uri.endsWith(exx) && uri.substring(1, uri.length() - exx.length()).indexOf("/") == -1)) {
					return true;
				}
			} else if (ex.endsWith("/*")) { // 类似 /login/*的请求
				exx = ex.substring(0, ex.length() - 2);
				if (uri.equals(exx)
						|| (uri.startsWith(exx + "/") && uri.substring(exx.length() + 1).indexOf("/") == -1)) {
					return true;
				}
			} else if (ex.equals(uri)) {
				return true;
			}
		}
		return false;
	}

}
