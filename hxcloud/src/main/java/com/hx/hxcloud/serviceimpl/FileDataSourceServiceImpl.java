package com.hx.hxcloud.serviceimpl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hx.hxcloud.entity.FileDataSourceEntity;
import com.hx.hxcloud.repository.FileDataSourceRepository;
import com.hx.hxcloud.service.FileDataSourceService;

/**
 * 文件数据源的服务实现类
 * @author xush
 * @since 2019年12月6日
 */
@Service
public class FileDataSourceServiceImpl implements FileDataSourceService {
	@Autowired
	FileDataSourceRepository frep;

	@Override
	public void save(FileDataSourceEntity fds) {
		frep.save(fds);
	}

	@Override
	public FileDataSourceEntity findById(String id) {
		return frep.findById(id);
	}

	@Override
	public List<FileDataSourceEntity> listDatas() {
		return frep.findAll();
	}

	@Override
	public int getTotalCount() {
		return (int) frep.count();
	}

	@Override
	public void update(FileDataSourceEntity fds) {
		FileDataSourceEntity oldFds = findById(fds.getId());
		if (oldFds != null) {
			oldFds.setCaption(fds.getCaption());
			oldFds.setCreator(fds.getCreator());
			oldFds.setPath(fds.getPath());
			oldFds.setType(fds.getType());
			frep.save(oldFds);
		}
	}

	@Override
	public void deleteById(String id) {
		frep.delete(findById(id));
	}

	@Override
	public List<FileDataSourceEntity> queryList(FileDataSourceEntity fds, Pageable pageable) {
		Specification<FileDataSourceEntity> query = new Specification<FileDataSourceEntity>() {
			/**
			 * 序列化id
			 */
			private static final long serialVersionUID = -6554077526281828131L;

			@Override
			public Predicate toPredicate(Root<FileDataSourceEntity> root, CriteriaQuery<?> criteriaQuery,
					CriteriaBuilder criteriaBuilder) {
				ArrayList<Predicate> predicates = new ArrayList<>();
				if (fds != null) {
					if (fds.getCaption() != null) {
						predicates.add(criteriaBuilder.like(root.get("caption"), "%" + fds.getCaption() + "%"));
					}
				}
				return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
			}
		};
		return frep.findAll(query, pageable).getContent();
	}

}
