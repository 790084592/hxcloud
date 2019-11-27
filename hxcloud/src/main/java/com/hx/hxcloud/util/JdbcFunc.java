package com.hx.hxcloud.util;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;


@SuppressWarnings("unchecked")
public class JdbcFunc {

	/**
	 * 检查数据库表是否存在
	 * @param tableName
	 * @return
	 */
	public static boolean checkTableExist(String tableName, JdbcTemplate jdbcTemplate) {
		String sql = String.format("select count(*) as answer from INFORMATION_SCHEMA.TABLES whereTABLE_SCHEMA='%s' and TABLE_NAME='%s' ", "test",tableName );
//		String sql = "select count(*) as answer from user_tables where table_name =upper('" + tableName + "')";
		String sql2 = "SELECT count(*) as answer FROM information_schema.TABLES WHERE table_name =upper('" + tableName+ "');";

		if(jdbcTemplate == null) {
			System.out.println("----jdbc null");
		}
		ArrayList<Integer> list = (ArrayList<Integer>) jdbcTemplate.query(sql2, new RowMapper() {
			public Integer mapRow(ResultSet rs, int rowNum) throws SQLException {
				int answer = rs.getInt("answer");
				return answer;
			}
		});
		if (list.size() > 0) {
			return list.get(0) > 0;
		}
		return false;
	}
	
	/**
	 * 建表
	 * @param sql
	 * @return
	 */
	public static boolean createTable(String sql, JdbcTemplate jdbcTemplate) {
		jdbcTemplate.execute(sql);
		return false;
	}

}
