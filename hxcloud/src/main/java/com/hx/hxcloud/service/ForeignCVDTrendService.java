package com.hx.hxcloud.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.data.domain.Pageable;

import com.fasterxml.jackson.annotation.JsonFormat.Feature;
import com.hx.hxcloud.entity.ForeignCVDTrendEntity;

public interface ForeignCVDTrendService {
	public ForeignCVDTrendEntity findById(String id);

	public List<ForeignCVDTrendEntity> listDatas();

	public int getTotalCount();

	public void save(ForeignCVDTrendEntity fds);
	
	public void saveAll(ArrayList<ForeignCVDTrendEntity> list);

	public void update(ForeignCVDTrendEntity fds);

	public void deleteById(String id);

	public List<ForeignCVDTrendEntity> queryList(ForeignCVDTrendEntity fds, Pageable pageable);
	
}
