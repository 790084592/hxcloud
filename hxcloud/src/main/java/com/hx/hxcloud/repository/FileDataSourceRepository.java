package com.hx.hxcloud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.hx.hxcloud.entity.FileDataSourceEntity;

@Repository
public interface FileDataSourceRepository
		extends JpaRepository<FileDataSourceEntity, Integer>, JpaSpecificationExecutor<FileDataSourceEntity> {

	public FileDataSourceEntity findById(String id);

}
