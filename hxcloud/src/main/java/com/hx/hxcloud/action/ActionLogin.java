package com.hx.hxcloud.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 处理登录页面请求 1.跳转到登录页 2.检验登录 3.注销登录
 * 
 * @author xush
 * @since 2019年9月12日
 */
@Controller
public class ActionLogin {

	/**
	 * 跳转到登录页面
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping("/login")
	public String login(HttpServletRequest req) {
		req.setAttribute("title", "登录");
		return "login";
	}

	/**
	 * 检验登录
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping("/dologin")
	@ResponseBody
	public String doLogin(HttpServletRequest req) {
		req.setAttribute("title", "登录");
		String account = req.getParameter("account");
		String password = req.getParameter("password");
		if (account != null && account.equals(password)) {
			HttpSession session = req.getSession();
			session.setAttribute("account", account);
			return "success";
		} else {
			return "用户名与密码不匹配！请重试！ (内测: 密码=账号)";
		}
	}

	/**
	 * 请求注销，登出
	 * 
	 * @param req
	 */
	@RequestMapping("/dologout")
	@ResponseBody
	public void doLogout(HttpServletRequest req) {
		HttpSession session = req.getSession();
		session.removeAttribute("account");
	}
}
