package com.ssafysignal.api.apply.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafysignal.api.apply.entity.ApplyExp;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface ApplyExpRepository extends JpaRepository<ApplyExp, Integer>{
    Optional<List<ApplyExp>> findApplyExpsByApplySeq(Integer integer);

    List<ApplyExp> findAllByApplySeq(Integer applySeq);
}
