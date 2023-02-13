package com.ssafysignal.api.apply.repository;

import com.ssafysignal.api.apply.entity.ApplySkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplySkillRepository extends JpaRepository<ApplySkill, Integer> {
    List<ApplySkill> findAllByApplySeq(Integer applySeq);
}
