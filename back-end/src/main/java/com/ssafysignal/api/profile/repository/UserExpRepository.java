package com.ssafysignal.api.profile.repository;

import com.ssafysignal.api.profile.entity.UserExp;
import com.ssafysignal.api.profile.entity.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserExpRepository extends JpaRepository<UserExp, Integer> {
    List<UserExp> findByUserSeq(Integer userSeq);

    Optional<UserExp> findByUserExpSeq(Integer userExpSeq);
}
