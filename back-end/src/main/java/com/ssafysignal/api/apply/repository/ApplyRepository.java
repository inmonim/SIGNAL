package com.ssafysignal.api.apply.repository;

import com.ssafysignal.api.apply.entity.Apply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplyRepository extends JpaRepository<Apply, Integer> {
}
