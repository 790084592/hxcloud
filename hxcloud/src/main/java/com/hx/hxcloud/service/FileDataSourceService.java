package com.hx.hxcloud.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.hx.hxcloud.entity.FileDataSourceEntity;

public interface FileDataSourceService {
	public FileDataSourceEntity findById(String id);

	public List<FileDataSourceEntity> listDatas();

	public int getTotalCount();

	public void save(FileDataSourceEntity fds);

	public void update(FileDataSourceEntity fds);

	public void deleteById(String id);

	public List<FileDataSourceEntity> queryList(FileDataSourceEntity fds, Pageable pageable);
}
