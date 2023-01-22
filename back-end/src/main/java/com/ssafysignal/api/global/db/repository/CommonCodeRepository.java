package com.ssafysignal.api.global.db.repository;

import com.ssafysignal.api.global.db.entity.CommonCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommonCodeRepository extends JpaRepository<CommonCode, String> {
    List<CommonCode> findByGroupCode(String groupCode);
}
