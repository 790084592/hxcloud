package com.hx.hxcloud.widget;

import java.util.List;

import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;

public class LineChartWidegt extends ChartWidget {

	public static final String TAG = "LineChartWidegt";

	private JSONObject chartOption;

	private JSONObject xCoordinate;

	private JSONObject yCoordinate;

	// 库表信息
	private JSONArray tableInfo;

	public LineChartWidegt(JSONObject content) {
		super(content);
		this.chartOption = content.getJSONObject("chartOption");
		this.xCoordinate = content.getJSONObject("xCoordinate");
		this.yCoordinate = content.getJSONObject("yCoordinate");
		this.tableInfo = content.getJSONArray("tableInfo");
	}

	/**
	 * 请求x轴数据
	 * 
	 * @return
	 */
	public String prexAisx() {
//		StringBuffer sql = new StringBuffer();
//		sql.append("select ").append(xCoordinate.getStr("value"))
//				.append(" , ").append(yCoordinate.getStr("level")).append(" from ").append(" ").append(" where ")
//				.append(xCoordinate.getStr("exp")).append(" and ").append(yCoordinate.getStr("exp"));
//		return sql.toString();
		String sql = "SELECT distinct day_ FROM hxcloud_foreign_coronavirusdatas where (country_ ='美国' or country_ = '意大利'  or country_ = '法国' or country_ = '英国' )  order by day_ asc ";
		return sql;
	}

	/**
	 * 构造x轴数据
	 * 
	 * @param result
	 */
	public void afterxAisx(List<String> result) {
		JSONArray xAxisData = new JSONArray(); // x轴数据
		for (String lineData : result) {
			xAxisData.put(lineData);
		}
		this.chartOption.getJSONObject("xAxis").put("data", xAxisData);
	}

	public String preCalc() {
//		StringBuffer sql = new StringBuffer();
//		sql.append("select ").append(xCoordinate.getStr("value")).append(" , ").append(yCoordinate.getStr("value"))
//				.append(" , ").append(yCoordinate.getStr("level")).append(" from ").append(" ").append(" where ")
//				.append(xCoordinate.getStr("exp")).append(" and ").append(yCoordinate.getStr("exp"));
//		return sql.toString();
		String sql = "SELECT day_, country_  , sure_cnt_ FROM hxcloud_foreign_coronavirusdatas where (country_ ='美国' or country_ = '意大利'  or country_ = '法国' or country_ = '英国' )  group by country_,day_ order by country_, day_ asc ";
		return sql;
	}

	public void afterCalc(List<Object[]> result) {
		JSONArray legendData = new JSONArray(); // 图例数据
		JSONArray series = new JSONArray(); // 多系列
		JSONArray xAxisData = this.chartOption.getJSONObject("xAxis").getJSONArray("data");// x轴数据
		int xAxisDataIndex = 0;
		// 构建条形图数据，无x轴对应位置需补null
		for (Object[] lineData : result) {
			String xAxis = (String) lineData[0];
			String level = (String) lineData[1];
			int yValue = Integer.parseInt((String) lineData[2]);
			// 构建图例和多系列
			if (!legendData.contains(level)) {
				legendData.add(level);
				JSONObject oneSerie = new JSONObject();
				oneSerie.put("name", level);
				oneSerie.put("type", "line");
				oneSerie.put("data", new JSONArray());
				series.add(oneSerie);
				xAxisDataIndex = 0;
			}
			// 添加系列数据
			String xXata = xAxisData.getStr(xAxisDataIndex);
			JSONArray lastSerieData = series.getJSONObject(series.size() - 1).getJSONArray("data");
			if (xXata.equals(xAxis)) {
				lastSerieData.add(yValue);
				xAxisDataIndex++;
			} else {
				for (; xAxisDataIndex < xAxisData.size(); xAxisDataIndex++) {
					xXata = xAxisData.getStr(xAxisDataIndex);
					if (xXata.equals(xAxis)) {
						lastSerieData.add(yValue);
						xAxisDataIndex++;
						break;
					} else {
						lastSerieData.add(null);
					}
				}
			}
		}
		// 重设条形图数据
		this.chartOption.getJSONArray("dataZoom").getJSONObject(0).put("startValue", xAxisData.get(0));
		this.chartOption.getJSONObject("legend").put("data", legendData);
		this.chartOption.put("series", series);
	}

	public JSONObject getChartOption() {
		return chartOption;
	}

}
