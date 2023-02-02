package com.ssafysignal.api.apply.repository;

import com.ssafysignal.api.apply.entity.ApplyAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplyAnswerRepository extends JpaRepository<ApplyAnswer, Integer> {
    List<ApplyAnswer> findAllByApplySeq(Integer applySeq);
}
