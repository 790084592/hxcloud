package com.hx.hxcloud.serviceimpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonFormat.Feature;
import com.hx.hxcloud.entity.ForeignCVDTrendEntity;
import com.hx.hxcloud.repository.ForeignCVDTrendRepository;
import com.hx.hxcloud.service.ForeignCVDTrendService;

@Service
public class ForeignCVDTrendServiceImpl implements ForeignCVDTrendService {
	@Autowired
	ForeignCVDTrendRepository rep;
	
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public ForeignCVDTrendEntity findById(String id) {
		return rep.findById(id);
	}

	@Override
	public List<ForeignCVDTrendEntity> listDatas() {
		return rep.findAll();
	}

	@Override
	public int getTotalCount() {
		return (int) rep.count();
	}

	@Override
	public void save(ForeignCVDTrendEntity fds) {
		rep.save(fds);
	}

	@Override
	public void update(ForeignCVDTrendEntity fds) {
		ForeignCVDTrendEntity old = findById(fds.getId());
		if(old != null) {
			old.setCountry(fds.getCountry());
			old.setDay(fds.getDay());
			old.setSure_cnt(fds.getSure_cnt());
			rep.save(old);
		}
	}

	@Override
	public void deleteById(String id) {
		rep.delete(findById(id));
	}

	@Override
	public List<ForeignCVDTrendEntity> queryList(ForeignCVDTrendEntity fds, Pageable pageable) {
		Specification<ForeignCVDTrendEntity> query = new Specification<ForeignCVDTrendEntity>() {
			
			/**
			 * 
			 */
			private static final long serialVersionUID = 1264990717953014169L;

			@Override
			public Predicate toPredicate(Root<ForeignCVDTrendEntity> root, CriteriaQuery<?> criteriaQuery,
					CriteriaBuilder criteriaBuilder) {
				ArrayList<Predicate> predicates = new ArrayList<>();
				if (fds != null) {
					if (fds.getCountry() != null) {
						predicates.add(criteriaBuilder.equal(root.get("country"), fds.getCountry()));
					}
				}
				return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
			}
		};
		return rep.findAll(query, pageable).getContent();
	}

	@Override
	public void saveAll(ArrayList<ForeignCVDTrendEntity> list) {
		rep.saveAll(list);
	}

}
