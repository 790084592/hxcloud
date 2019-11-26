package com.hx.hxcloud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * 启动类 继承SpringBootServletInitializer，用于war包Tomcat部署
 * 
 * @author xush
 * @since 2019年10月11日
 */
@SpringBootApplication
@EnableJpaRepositories
public class HxCloudApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(HxCloudApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(HxCloudApplication.class);
	}
}
