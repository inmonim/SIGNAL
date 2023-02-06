package com.ssafysignal.api.apply.repository;

import com.ssafysignal.api.apply.entity.ApplyCareer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplyCareerRepository extends JpaRepository<ApplyCareer, Integer>{
    Optional<List<ApplyCareer>> findApplyCareersByApplySeq(Integer applySeq);

    List<ApplyCareer> findAllByApplySeq(Integer applySeq);
}
