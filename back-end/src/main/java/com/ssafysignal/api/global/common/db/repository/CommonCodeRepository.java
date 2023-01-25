package com.ssafysignal.api.global.common.db.repository;

import com.ssafysignal.api.global.common.db.entity.CommonCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommonCodeRepository extends JpaRepository<CommonCode, String> {
    List<CommonCode> findByGroupCode(String groupCode);
}
