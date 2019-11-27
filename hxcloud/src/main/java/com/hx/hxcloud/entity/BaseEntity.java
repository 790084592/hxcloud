package com.hx.hxcloud.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * 所有实体的基类
 * 
 * @author xush
 * @since 2019年10月11日
 */
@MappedSuperclass
public class BaseEntity implements Serializable {

	private static final long serialVersionUID = -2412046011446204120L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int uuid;

	@Column(name = "id", unique = true)
	public String id;

	@Column(name = "CREATETIME_", updatable = false)
	@org.hibernate.annotations.CreationTimestamp
	private Date createTime;

	@Column(name = "UPDATETIME_")
	@org.hibernate.annotations.UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP) // 不加此注解，会导致更新时间的与创建时间的格式不一致
	private Date updateTime;

	public int getUuid() {
		return uuid;
	}

	public void setUuid(int uuid) {
		this.uuid = uuid;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

}