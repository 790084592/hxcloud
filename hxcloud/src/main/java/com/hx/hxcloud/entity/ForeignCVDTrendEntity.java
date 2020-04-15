package com.hx.hxcloud.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 主要外国国家感染新冠肺炎的历史数据的实体类
 * @author xush
 * @since 2020年04月05日
 */
@Entity
@Table(name = "hxcloud_foreign_coronavirusdatas")
public class ForeignCVDTrendEntity implements Serializable{
	

	/**
	 * 
	 */
	private static final long serialVersionUID = -2522070512356726090L;

	@Column(name = "country_")
	private String country;
	
	@Column(name = "day_")
	private String day;
	
	@Column(name = "sure_cnt_")
	private int sure_cnt;
	
	@Id
	@Column(name = "id", unique = true)
	private String id;

	public ForeignCVDTrendEntity() {

	}
	
	
	/**
	 * 
	 * @param country 国家
	 * @param day     日期
	 * @param sure_cnt  确诊人数
	 */
	public ForeignCVDTrendEntity(String  id, String country, String day, int sure_cnt) {
		super();
		this.id = id;
		this.country = country;
		this.day = day;
		this.sure_cnt = sure_cnt;
	}



	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}

	public int getSure_cnt() {
		return sure_cnt;
	}

	public void setSure_cnt(int sure_cnt) {
		this.sure_cnt = sure_cnt;
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	
	
	
	
}