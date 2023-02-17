package com.ssafysignal.api.apply.repository;

import com.ssafysignal.api.apply.entity.ApplyCareer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplyCareerRepository extends JpaRepository<ApplyCareer, Integer>{
}
