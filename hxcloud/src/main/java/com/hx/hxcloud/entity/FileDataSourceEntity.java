package com.hx.hxcloud.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 文件数据源的实体类
 * @author xush
 * @since 2019年12月6日
 */
@Entity
@Table(name = "hxcloud_file_data_source")
public class FileDataSourceEntity extends BaseEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1450371555972706489L;

	@Column(name = "caption_")
	private String caption;
	
	@Column(name = "path_")
	private String path;

	@Column(name = "type_")
	private int type;
	
	@Column(name = "creator_")
	private String creator;

	public FileDataSourceEntity() {

	}
	
	/**
	 * 
	 * @param id 资源id
	 * @param caption 标题
	 * @param path 路径
	 * @param type 类型
	 * @param creator 创建者
	 */
	public FileDataSourceEntity(String id, String caption, String path, int type, String creator) {
		this.id = id;
		this.type = type;
		this.path = path;
		this.caption = caption;
		this.creator = creator;
	}

	public String getCaption() {
		return caption;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}
	
	
	
}