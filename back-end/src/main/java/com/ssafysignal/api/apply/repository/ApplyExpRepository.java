package com.ssafysignal.api.apply.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafysignal.api.apply.entity.ApplyExp;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplyExpRepository extends JpaRepository<ApplyExp, Integer>{
}
