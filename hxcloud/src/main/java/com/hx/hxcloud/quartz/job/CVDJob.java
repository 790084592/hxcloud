package com.hx.hxcloud.quartz.job;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

import com.hx.hxcloud.serviceimpl.CoronaVirusDatasServiceImpl;

import cn.hutool.json.JSONObject;

/**
 * 计划任务更新疫情数据
 * 
 * @author xush
 * @since 2020年4月6日
 */
@Component
public class CVDJob extends QuartzJobBean {
	@Autowired
	public CoronaVirusDatasServiceImpl cvdService;

	@Override
	protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
		// 获取JobDetail中关联的数据
		String msg = (String) context.getJobDetail().getJobDataMap().get("msg");
		System.out.println("current time :" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())
				+ "---开始执行计划任务【" + msg + "】");
		cvdService.updateCoronaVirusDatas(getCoronaVirusDatas());
		System.out.println("current time :" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())
				+ "---计划任务【" + msg + "】执行完成");
	}

	/**
	 * 获取新冠肺炎数据
	 * 
	 * @return
	 */
	public JSONObject getCoronaVirusDatas() {
		String data = "";
		try {
			// 创建一个URL实例
			URL url = new URL(
					"https://api.m.sm.cn/rest?format=json&method=Huoshenshan.healingCity&mapType=1&callback=__jp1");
			try {
				// 通过URL的openStrean方法获取URL对象所表示的自愿字节输入流
				InputStream is = url.openStream();
				InputStreamReader isr = new InputStreamReader(is, "utf-8");
				// 为字符输入流添加缓冲
				BufferedReader br = new BufferedReader(isr);
				String linedata = br.readLine();// 读取数据
				while (linedata != null) {// 循环读取数据
					System.out.println(data);// 输出数据
					data += linedata;
					linedata = br.readLine();
				}
				br.close();
				isr.close();
				is.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		data = data.substring(6, data.length() - 2);
		JSONObject object = new JSONObject(data);
		return object;
	}

}
