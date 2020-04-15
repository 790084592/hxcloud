package com.hx.hxcloud.service;

import cn.hutool.json.JSONObject;

public interface CoronaVirusDatasService {
	/**
	 * 获取主要外国国家新冠肺炎历史数据信息
	 * @return
	 */
	public JSONObject getForeignTrendDatas();
	
	/**
	 * 获取全球当日新冠肺炎数据信息
	 * @return
	 */
	public JSONObject getForeignRealTimeDatas();
	
	/**
	 * 获取祖国各省市当日新冠肺炎数据信息
	 * @return
	 */
	public JSONObject getChinaRealTimeDatas();
	
	/**
	 * 获取祖国总体新冠肺炎历史数据信息
	 * @return
	 */
	public JSONObject getChinaTrendDatas();
	
	/**
	 * 更新疫情数据
	 * @param datas
	 */
	public void updateCoronaVirusDatas(JSONObject datas);
}
