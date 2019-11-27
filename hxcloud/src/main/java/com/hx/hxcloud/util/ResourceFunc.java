package com.hx.hxcloud.util;

import java.io.File;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 处理资源id
 * @author xush
 * @since  2019年9月27日
 */
public class ResourceFunc {
	
	//数据源存储位置
	public final static String DATASOURCE_SORT_PATH = "D:\\0A_XFly_Place";
	
	//文件数据源存储位置
	public final static String FILE_DATASOURCE_SORT_PATH = "D:\\0A_XFly_Place\\Excel";
	
	/**
	 * 创建数据源id
	 * @param account 用户
	 * @param type 数据源类型  0-Excel
	 * @return
	 */
	public static String createDataSourceId(String account, String type) {
		DateFormat dayFormat = new SimpleDateFormat("yyyyMMddhhmmss");
		String time = dayFormat.format(new Date());
		return account + "$" + time + "$" + type;
	}
	
	/**
	 *  获取数据源文件存储的路径
	 * @param resid 资源id
	 * @param tag   后缀名
	 * @return
	 */
	public static String getFileDataSourcePath(String resid, String tag) {
		String path = "";
		switch (tag){
			case "xls":
			case "xlsx": path = FILE_DATASOURCE_SORT_PATH + File.separator + resid + "." + tag;
		}
		return path;
	}

}
