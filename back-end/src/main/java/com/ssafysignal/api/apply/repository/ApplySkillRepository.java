package com.ssafysignal.api.apply.repository;

import com.ssafysignal.api.apply.entity.ApplySkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplySkillRepository extends JpaRepository<ApplySkill, Integer> {

    Optional<List<ApplySkill>> findApplySkillsByApplySeq(Integer integer);

    List<ApplySkill> findAllByApplySeq(Integer applySeq);
}
