package com.hx.hxcloud.serviceimpl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hx.hxcloud.entity.ForeignCVDTrendEntity;
import com.hx.hxcloud.service.CoronaVirusDatasService;

import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;

@Service
public class CoronaVirusDatasServiceImpl implements CoronaVirusDatasService {

	@Autowired
	ForeignCVDTrendServiceImpl ftrendService;

	@Override
	public JSONObject getForeignTrendDatas() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public JSONObject getForeignRealTimeDatas() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public JSONObject getChinaRealTimeDatas() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public JSONObject getChinaTrendDatas() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateCoronaVirusDatas(JSONObject datas) {
		JSONObject globalTrend = datas.getJSONObject("globalTrend");
		ArrayList<ForeignCVDTrendEntity> list = new ArrayList<ForeignCVDTrendEntity>();
		for(String country: globalTrend.keySet()) {
			JSONArray countryHistoryData = globalTrend.getJSONArray(country);
			for(int i = 0; i < countryHistoryData.size(); i++) {
				JSONObject countryDayData = countryHistoryData.getJSONObject(i);
				String day = countryDayData.getStr("day");
				int sure_cnt = countryDayData.getInt("sure_cnt");
				String id = country + "$" +day;
				ForeignCVDTrendEntity dayDatas = new ForeignCVDTrendEntity(id, country, day, sure_cnt);
				list.add(dayDatas);
			}
		}
		
		ftrendService.saveAll(list);
	}

}
