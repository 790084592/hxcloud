package com.hx.hxcloud.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.annotation.JsonFormat.Feature;
import com.hx.hxcloud.entity.ForeignCVDTrendEntity;
import com.hx.hxcloud.serviceimpl.ForeignCVDTrendServiceImpl;

import cn.hutool.json.JSONObject;

/**
 * 新冠肺炎数据页面
 * 
 * @author xush
 * @since 2020年4月6日
 */
@Controller
public class ActionCoronaVirus {

	@Autowired
	private ForeignCVDTrendServiceImpl fCVDService;

	/**
	 * 跳转到数据源界面
	 * 
	 * @return
	 */
	@RequestMapping("/coronavirus")
	public String toDataSource() {
		return "coronavirus/coronavirus";
	}
	
	
	@RequestMapping("/coronavirus/listForeignTrendDatas")
	@ResponseBody
	public HashMap<String, List> foreignTrend(HttpServletRequest req) {
		HashMap<String, List> map = new HashMap<String, List>();
		ArrayList<String> dayList = new ArrayList<String>();
		ArrayList<Integer> cntList = new ArrayList<Integer>();
		String country = req.getParameter("country");
		Order order = new Order(Sort.Direction.ASC, "day");
		Sort sort = Sort.by(order);
		Pageable pageable = PageRequest.of(0, 100, sort);
		ForeignCVDTrendEntity filter = new ForeignCVDTrendEntity();
		filter.setCountry(country);
		List<ForeignCVDTrendEntity> list = fCVDService.queryList(filter, pageable);
		for (ForeignCVDTrendEntity entity : list) {
			dayList.add(entity.getDay());
			cntList.add(entity.getSure_cnt());
		}
		map.put("day", dayList);
		map.put("cnt", cntList);
		return map;
	}
}
