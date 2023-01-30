package com.ssafysignal.api.profile.repository;

import com.ssafysignal.api.profile.entity.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSkillRepository extends JpaRepository<UserSkill, Integer> {
    List<UserSkill> findByUserSeq(Integer userSeq);

    Optional<UserSkill> findByUserSkillSeq(Integer userSkillSeq);
}
