package com.ssafysignal.api.apply.repository;

import com.ssafysignal.api.apply.entity.Apply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ApplyRepository extends JpaRepository<Apply, Integer> {
    Optional<Apply> findByApplySeq(Integer ApplySeq);
}
