package com.ssafysignal.api.profile.repository;

import com.ssafysignal.api.profile.entity.UserCareer;
import com.ssafysignal.api.profile.entity.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserCareerRepository extends JpaRepository<UserCareer, Integer> {
    List<UserCareer> findByUserSeq(Integer userSeq);

    Optional<UserCareer> findByUserCareerSeq(Integer userCareerSeq);
}
