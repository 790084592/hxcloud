package com.hx.hxcloud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hx.hxcloud.entity.ForeignCVDTrendEntity;

/**
 * 主要外国国家感染新冠肺炎的历史数据的仓库类
 * 
 * @author xush
 * @since 2020.04.05
 */
@Repository
public interface ForeignCVDTrendRepository
		extends JpaRepository<ForeignCVDTrendEntity, Integer>, JpaSpecificationExecutor<ForeignCVDTrendEntity> {

	public ForeignCVDTrendEntity findById(String id);

}
