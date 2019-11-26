package com.hx.hxcloud.action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 数据集处理 1.跳转到数据集界面
 * 
 * @author xush
 * @since 2019年9月19日
 */
@Controller
public class ActionDataSubject {

	@RequestMapping("/datasubject")
	public String toDataSource() {
		return "datasubject/datasubject";
	}

}
